import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {Observable, of, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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

  login(userInfo: {login: string, password: string}): Observable<string | boolean>{
    if (userInfo.login === 'admin' && userInfo.password === 'admin123'){
      this.setToken('sdsdadsvaavd452325t4fwec');
      return of(true);
    }
    return throwError(()=> new Error('Failed login'));
  }
}
