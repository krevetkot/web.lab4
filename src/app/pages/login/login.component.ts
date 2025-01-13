import {Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CommonModule} from '@angular/common';
import {AuthService} from '../../services/auth.service';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import {HttpClientModule} from "@angular/common/http";
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    HttpClientModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;
  isRegister = false;
  cookieService = inject(CookieService)

  constructor(private router: Router,
    private authService: AuthService) {}

  submitLogin(){
    this.authService.login(this.loginForm.value, this.isRegister).subscribe({
      next: (response) => {
        if (response.accessToken && response.refreshToken){
          this.authService.setAccessToken(response.accessToken);
          this.cookieService.set('refreshToken', response.refreshToken);
          this.router.navigate(['main']).then(); // Перенаправление на главную страницу
        }
      },
      error: (err) => {
        if (err.status==401){
          alert("Неверный логин.")
        } else if (err.status == 403){
          alert("Неверный пароль.")
        }
        else {
          alert(err.message)
        }
      }
    })
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'login': new FormControl('', [Validators.required]),
      'password': new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
      ])
    })
  }

  toggleForm() {
    this.isRegister = !this.isRegister;
  }
}

