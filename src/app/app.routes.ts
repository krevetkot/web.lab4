import { Routes } from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {MainComponent} from './pages/main/main.component';
import {AuthGuard} from './guards/auth.guard';

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {
    path: 'main',
    component: MainComponent,
    canActivate: [AuthGuard]
  },
  {path: '**', component: LoginComponent}
];
