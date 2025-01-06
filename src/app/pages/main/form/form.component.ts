import {Component, importProvidersFrom, OnInit, Output} from '@angular/core';
import { SliderModule } from 'primeng/slider';
import { KnobModule} from 'primeng/knob';
import {FormControl, FormGroup, ReactiveFormsModule, Validators, NgModel, FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {PointService} from '../../../services/point.service';
import {Point} from '../../../Interfaces/point.interface';
import {EventEmitter} from '@angular/core';

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
  @Output() pointAdded: EventEmitter<any> = new EventEmitter();
  mainForm!: FormGroup;
  yValue: number = 0;
  xValue: number = 0;
  rValue: number = 1;
  loading: boolean = false;
  constructor(private router: Router,
              private authService: AuthService,
              private pointService: PointService) {}

  submitMainForm(){
    this.loading = true;
    const newPoint: Point = {
      x: this.xValue,
      y: this.yValue,
      r: this.rValue,
      isHit: false // по умолчанию. на сервере пересчитаем
    };
    this.pointService.insertPoint(newPoint).subscribe({
      error: (err) => {
        alert('Ошибка сервера: ' + err.message);
      }
    })
    this.pointAdded.emit(newPoint);
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
