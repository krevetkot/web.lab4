import { Routes } from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {MainComponent} from './pages/main/main.component';

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'main', component: MainComponent},
  {path: '**', component: LoginComponent}
];
