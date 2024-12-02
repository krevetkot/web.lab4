import {Component, OnInit} from '@angular/core';
import { SliderModule } from 'primeng/slider';
import {FormControl, FormGroup, ReactiveFormsModule, Validators, NgModel, FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-form',
  imports: [
    SliderModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit{
  mainForm!: FormGroup;
  yValue: any;
  constructor(private router: Router,
              private authService: AuthService) {}

  submitMainForm(){}

  ngOnInit(): void {
    this.mainForm = new FormGroup({
      'yValue': new FormControl('', [
        Validators.min(-3), Validators.max(5)]),
      'password': new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
      ])
    })
  }
}
