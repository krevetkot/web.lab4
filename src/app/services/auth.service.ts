import {inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, of, throwError} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authApiUrl = environment.authApiUrl;
  http = inject(HttpClient)

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

  login(userInfo: {login: string, password: string}){
    return this.http.post<LoginResponse>(this.authApiUrl+'/login', userInfo);
  }
}

export interface LoginResponse {
  status: number;
  token?: string;
  message?: string;
}
