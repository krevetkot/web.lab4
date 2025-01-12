import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import {Observable, from, catchError, of} from 'rxjs';
import { AuthService } from '../services/auth.service';
import { switchMap } from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  authApiUrl = environment.authApiUrl;
  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // URL для обновления токена
    const refreshTokenUrl = this.authApiUrl+'/refresh';
    const token = this.auth.getAccessToken();

    // Если это запрос на обновление токена — пропускаем без обработки
    if (req.url.includes(refreshTokenUrl)) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
        withCredentials: true
      });
      return next.handle(cloned);
    }

    console.log(token);

    if (token && this.auth.isTokenExpired(token)) {
      return from(this.auth.refreshToken()).pipe(
        switchMap(() => {
          const newToken = this.auth.getAccessToken(); // Берём новый токен
          const cloned = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${newToken}`),
            withCredentials: true
          });
          return next.handle(cloned); // Отправляем запрос с новым токеном
        }),
        catchError((error) => {
          if (error.status == 503 || error.status == null){
            alert("Сервер не отвечает.")
            this.auth.logout()
          }
            return of();
        })
      );
    }

    // Если токен действителен, просто добавляем его
    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
      return next.handle(cloned);
    }

    return next.handle(req); // Если токена нет, запрос без авторизации
  }
}
