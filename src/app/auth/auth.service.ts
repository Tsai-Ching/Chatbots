import { RegisterEntity } from './../register/entity/register.entity';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs/operators';
import { LoginEntity } from '../login/login/entity/login-entity';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

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

  login(loginEntity: LoginEntity): Observable<{access_token: string, refresh_token: string, token_type: string}> {
    return this.#httpClient.post<any>(`${this.baseUrl}/api/v1/users/auth/jwt/login`,
      `username=${loginEntity.email}&password=${encodeURIComponent(loginEntity.password)}&grant_type=password`
      , {headers: { 'Content-Type': 'application/x-www-form-urlencoded' }})
      .pipe(tap((result) => {
        this.#cookieService.set('token', result.access_token);
        console.log(this.#cookieService.get('token'));

      }));
  }

  logout() {
    this.#cookieService.delete('token')
  }

  isLoggedIn() {
    const token = this.#cookieService.get('token');
    if (!token) return false;
    return true;
  }

  resetPassword(data: { current_password: string; new_password: string; name: string }) {

    return this.#httpClient.put<any>(`${this.baseUrl}/api/v1/users/`,
    {current_password:data.current_password,new_password:data.new_password, name:data.name},
    {
      headers: {
        'Authorization': 'Bearer ' + this.#cookieService.get('token'),
      }
    });
  }

  getGoogleLoginUrl() {
    return this.#httpClient.get<string>(`${this.baseUrl}/api/v1/users/auth/google/authorize`)
  }
}
