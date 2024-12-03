import {Component, importProvidersFrom, OnInit} from '@angular/core';
import { SliderModule } from 'primeng/slider';
import { KnobModule} from 'primeng/knob';
import {FormControl, FormGroup, ReactiveFormsModule, Validators, NgModel, FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';

@Component({
  selector: 'app-form',
  imports: [
    SliderModule,
    KnobModule,
    ReactiveFormsModule,
    FormsModule,
    CardModule,
    ButtonModule
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit{
  mainForm!: FormGroup;
  yValue: number = 0;
  xValue: number = 0;
  rValue: number = 1;
  loading: boolean = false;
  constructor(private router: Router,
              private authService: AuthService) {}

  submitMainForm(){
    this.loading = true;
    console.log(this.mainForm.value);
    this.loading = false;
  }

  ngOnInit(): void {
    this.mainForm = new FormGroup({
      'xValue': new FormControl('', [
        Validators.min(-3), Validators.max(5)]),
      'yValue': new FormControl('', [
        Validators.min(-10), Validators.max(10)])
    })
  }
}
