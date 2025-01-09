import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.auth.getAccessToken();

    if (token && this.auth.isTokenExpired(token)) {
      return from(this.auth.refreshToken().toPromise()).pipe(
        switchMap(() => {
          const newToken = this.auth.getAccessToken(); // Берём новый токен
          const cloned = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${newToken}`),
          });
          return next.handle(cloned); // Отправляем запрос с новым токеном
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
