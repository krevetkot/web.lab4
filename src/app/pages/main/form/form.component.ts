import {Component, OnInit} from '@angular/core';
import { SliderModule } from 'primeng/slider';
import { KnobModule} from 'primeng/knob';
import {FormControl, FormGroup, ReactiveFormsModule, Validators, NgModel, FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-form',
  imports: [
    SliderModule,
    KnobModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit{
  // mainForm: FormGroup;
  yValue: number = 0;
  xValue: number = 0;
  constructor(private router: Router,
              private authService: AuthService) {}

  submitMainForm(){}

  ngOnInit(): void {
    // this.mainForm = new FormGroup({
    //   'xValue': new FormControl('', [
    //     Validators.min(-3), Validators.max(5)]),
    //   'yValue': new FormControl('', [
    //     Validators.min(-10), Validators.max(10)])
    // })
  }
}
