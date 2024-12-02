import { Routes } from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {MainComponent} from './pages/main/main.component';
import {RegistrationComponent} from './pages/registration/registration.component';

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'main', component: MainComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: '**', component: LoginComponent}
];
