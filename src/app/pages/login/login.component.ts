import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';
import {AuthService} from '../../services/auth.service';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import {HttpClientModule} from "@angular/common/http";

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

  constructor(private router: Router,
    private authService: AuthService) {}

  submitLogin(){
    this.authService.login(this.loginForm.value, this.isRegister).subscribe({
      next: (response) => {
        if (response.status === 200) {
          // console.log('Login successful:', response.token);
          // localStorage.setItem('token', <string>response.token);
          this.router.navigate(['main']); // Перенаправление на главную страницу
        }
        else {
          alert(response.message);
        }
      },
      error: (err) => {
        alert('Ошибка сервера: ' + err.message);
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

