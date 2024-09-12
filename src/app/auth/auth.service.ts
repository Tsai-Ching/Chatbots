import { RegisterEntity } from './../register/entity/register.entity';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { LoginEntity } from '../login/login/entity/login-entity';
import { CookieService } from 'ngx-cookie-service';
import { Observable, throwError } from 'rxjs';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  #httpClient = inject(HttpClient)
  #cookieService = inject(CookieService)
  baseUrl = 'https://chatsource-api.onrender.com';

  constructor() { }

  register(data: RegisterEntity) {
    console.log(data);

    return this.#httpClient.post(`${this.baseUrl}/api/v1/users/register`, data);
  }

  /** 一般登入 */
  login(loginEntity: LoginEntity): Observable<{access_token: string, refresh_token: string, token_type: string}> {

    return this.#httpClient.post<any>(`${this.baseUrl}/api/v1/users/auth/jwt/login`,
      `username=${loginEntity.email}&password=${encodeURIComponent(loginEntity.password)}&grant_type=password`
      , {headers: { 'Content-Type': 'application/x-www-form-urlencoded' }})
      .pipe(
        tap((result) => {
          console.log('login successful');
          this.#cookieService.set('token', result.access_token);
        }),
        catchError((error) => {
          console.error('Login failed:', error);
          return throwError(error);
        })
      );
  }


  logout() {
    this.#cookieService.delete('token')
  }

  isLoggedIn() {
    console.log(this.#cookieService.getAll());

    const token = this.#cookieService.get('fastapiusersauth');
    if (!token) return false;
    return true;
  }

  resetPassword(data: { current_password: string; new_password: string; name: string }) {

    return this.#httpClient.post<any>(`${this.baseUrl}/api/v1/users/reset-password`,
    {current_password:data.current_password,new_password:data.new_password, name:data.name},
    {
      headers: {
        'Authorization': 'Bearer ' + this.#cookieService.get('token'),
      }
    });
  }

  getGoogleLoginUrl() {
    return this.#httpClient.get<string>(`${this.baseUrl}/api/v1/users/auth/google/authorize`,
    {
      headers: {
      "Content-Type": "application/json"
      }
    })
  }

  redirectToLogin(query: Params) {
    const code = query['code'];
    const state = query['state'];
    const scope = query['scope'];
    const authuser = query['authuser'];
    const prompt = query['prompt'];

    const callbackUrl = `/api/v1/users/auth/google/callback?state=${state}&code=${code}&scope=${scope}&authuser=${authuser}0&prompt=${prompt}`;
    console.log(callbackUrl);
    console.log(this.#httpClient.get(callbackUrl));



    return this.#httpClient.get(callbackUrl);
  }

}
