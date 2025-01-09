import {inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {catchError, Observable, of, tap, throwError} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import { environment } from '../../environments/environment';
import {Response} from '../Interfaces/response.interface';
import {jwtDecode} from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authApiUrl = environment.authApiUrl;
  http = inject(HttpClient)
  tokenName = 'accessToken';

  constructor(private route: Router) { }

  setAccessToken(token: string){
    localStorage.setItem(this.tokenName, token);
    console.log(token)
  }

  getAccessToken(){
    return localStorage.getItem(this.tokenName);
  }

  deleteAccessToken(){
    localStorage.removeItem(this.tokenName);
  }

  isLoggedIn(): boolean{
    return this.getAccessToken() !== null;
    // Можно добавить проверку срока действия токена
  }

  login(userInfo: {login: string, password: string}, isRegister: boolean): Observable<Response>{
    if (isRegister){
      return this.http.post<Response>(this.authApiUrl+'/register', userInfo);
    }
    return this.http.post<Response>(this.authApiUrl+'/login', userInfo);
  }

  // Проверка, истёк ли токен
  isTokenExpired(token: string): boolean {
    try {
      const { exp } = jwtDecode<{ exp: number }>(token); // Декодируем JWT, узнаем время окончания токена
      const now = Math.floor(Date.now() / 1000); // Текущее время в секундах
      return exp < now; // Возвращает true, если токен истёк
    } catch (e) {
      console.error('Invalid token:', e);
      return true; // Если токен некорректен, считаем его истёкшим
    }
  }

  // Обновление токена
  refreshToken(): Observable<void> {
    return this.http.post<any>(`${this.authApiUrl}/refresh`, {}).pipe(
      tap((response) => {
        localStorage.setItem('accessToken', response.accessToken); // Сохраняем новый токен
      }),
      catchError((error) => {
        console.error('Refresh token error:', error);
        return of(); // Можно вернуть пустое значение или обработать ошибку
      })
    );
  }

}
