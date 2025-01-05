import {inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, of, throwError} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);
  authApiUrl = environment.authApiUrl;

  constructor(private route: Router) { }

  setToken(token: string){
    //пока что фейковая авторизация
    localStorage.setItem('token', token);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  isLoggedIn(){
    return this.getToken() !== null;
  }

  login(userInfo: {login: string, password: string}): Observable<ArrayBuffer>{
    return this.http.post(this.authApiUrl, userInfo);



    // if (userInfo.login === 'admin' && userInfo.password === 'admin123'){
    //   this.setToken('sdsdadsvaavd452325t4fwec');
    //   return of(true);
    // }
    // return throwError(()=> new Error('Failed login'));
  }
}
