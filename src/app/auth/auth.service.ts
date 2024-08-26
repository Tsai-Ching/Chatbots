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
    return this.#httpClient.post(`${this.baseUrl}/api/v1/users/`, data);
  }

  login(loginEntity: LoginEntity): Observable<{accessToken: string, refreshToken: string, message: string}> {
    return this.#httpClient.post<any>(`${this.baseUrl}/api/v1/auth/login`,
      `username=${loginEntity.username}&password=${encodeURIComponent(loginEntity.password)}&grant_type=password`
      , {headers: { 'Content-Type': 'application/x-www-form-urlencoded' }})
      .pipe(tap((result) => {
        this.#cookieService.set('token', result.accessToken);
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
}
