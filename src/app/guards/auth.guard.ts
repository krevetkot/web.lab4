import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {Inject, Injectable} from '@angular/core';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root', // Глобальная регистрация
})
export class AuthGuard
  implements CanActivate
{
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.auth.isLoggedIn()) {
      return true; // Пользователь авторизован, разрешаем доступ
    } else {
      // Переадресация на login
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      //здесь можно не переадресовывать, а выводить сообщение а ля "вы не зареганы, доступ запрещен"
      return false;
    }
  }
}
