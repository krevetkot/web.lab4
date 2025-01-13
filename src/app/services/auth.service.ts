import {inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {catchError, Observable, of, tap, throwError} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import { environment } from '../../environments/environment';
import {Response} from '../Interfaces/response.interface';
import {jwtDecode} from 'jwt-decode';
import {CookieService} from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authApiUrl = environment.authApiUrl;
  http = inject(HttpClient)
  cookieService = inject(CookieService)
  tokenName = 'accessToken';

  constructor(private router: Router) { }

  setAccessToken(token: string){
    this.setLocalStorageItem(this.tokenName, token);
    console.log(token)
  }
  getAccessToken(){
    return this.getLocalStorageItem(this.tokenName);
  }
  deleteAccessToken(){
    localStorage.removeItem(this.tokenName);
  }

  setLocalStorageItem(key: string, value: string){
    if (typeof window !== "undefined" && window.localStorage){
      localStorage.setItem(key, value);
    }
  }
  getLocalStorageItem(key: string): string | null{
    if (typeof window !== "undefined" && window.localStorage){
      return localStorage.getItem(key);
    }
    return null;
  }

  isLoggedIn(): boolean{
    return this.getAccessToken() !== null;
  }

  login(userInfo: {login: string, password: string}, isRegister: boolean): Observable<Response>{
    if (isRegister){
      return this.http.post<Response>(this.authApiUrl+'/register', userInfo);
    }
    return this.http.post<Response>(this.authApiUrl+'/login', userInfo);
  }

  logout(){
    this.deleteAccessToken();
    this.cookieService.deleteAll();
    this.router.navigate(['/login']).then();
  }


  isTokenExpired(token: string): boolean {
    try {
      const { exp } = jwtDecode<{ exp: number }>(token);
      const now = Math.floor(Date.now() / 1000);
      return exp < now; // Возвращает true, если токен истёк
    } catch (e) {
      alert('Invalid token:' + e);
      this.logout();
      return false;
    }
  }

  refreshToken(): Observable<void> {
    return this.http.post<any>(`${this.authApiUrl}/refresh`, {}, { withCredentials: true }).pipe(
      tap((response) => {
        this.setLocalStorageItem('accessToken', response.accessToken);
      }),
      catchError((error) => {
        if (error.status === 403){
          alert("Срок вашей сессии истек. Пожалуйста, войдите в аккаунт заново.")
          this.logout()
          return of()
        } else {
          return throwError(() => error)
        }
      })
    );
  }

}
