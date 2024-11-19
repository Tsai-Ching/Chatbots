import { RegisterEntity } from './register/entity/register.entity';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { LoginEntity } from './login/entity/login-entity';
import { CookieService } from 'ngx-cookie-service';
import { Observable, throwError } from 'rxjs';
import { Params } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  #httpClient = inject(HttpClient)
  #cookieService = inject(CookieService)

  register(data: RegisterEntity) {
    return this.#httpClient.post(`${environment.apiHost}/api/v1/users/register`, data);
  }

  /** 一般登入 */
  login(loginEntity: LoginEntity): Observable<{ access_token: string, refresh_token: string, token_type: string }> {

    return this.#httpClient.post<any>(`${environment.apiHost}/api/v1/users/auth/jwt/login`,
      `username=${loginEntity.email}&password=${encodeURIComponent(loginEntity.password)}&grant_type=password`
      , { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
      .pipe(
        tap((result) => {
          // this.#cookieService.set('token', result.access_token);
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

  getResetEmail(email: string) {
    return this.#httpClient.post<any>(`${environment.apiHost}/api/v1/users/forgot-password`,
      { email: email },

    );
  }

  resetPassword(data: { new_password: string }, token: string) {
    return this.#httpClient.post<any>(`${environment.apiHost}/api/v1/users/reset-password`,
      { token: token, password: data.new_password },
      {
        headers: {
          "Content-Type": "application/json"
        }
      });
  }

  // resetPassword(data: { current_password: string; new_password: string; name: string }) {

  //   return this.#httpClient.post<any>(`${this.baseUrl}/api/v1/users/reset-password`,
  //   {current_password:data.current_password,new_password:data.new_password, name:data.name},
  //   {
  //     headers: {
  //       'Authorization': 'Bearer ' + this.#cookieService.get('token'),
  //     }
  //   });
  // }

  getGoogleLoginUrl() {
    return this.#httpClient.get<string>(`${environment.apiHost}/api/v1/users/auth/google/authorize`,
      {
        headers: {
          "Content-Type": "application/json"
        }
      })
  }

  redirectToLogin(query: Params) {
    const { code, state, scope, authuser, prompt } = query;
    const callbackUrl = `${environment.apiHost}/api/v1/users/auth/google/callback?state=${state}&code=${code}&scope=${scope}&authuser=${authuser}0&prompt=${prompt}`;
    return this.#httpClient.get(callbackUrl, { withCredentials: true });
  }

  updateEmail(email: string) {
    return this.#httpClient.patch<any>(`${environment.apiHost}/api/v1/users/me`,
      { email: email });
  }

  updatePassword(password: string) {
    return this.#httpClient.patch<any>(`${environment.apiHost}/api/v1/users/me`,
      { password: password });
  }

  // deleteUser() {

  // }
}
