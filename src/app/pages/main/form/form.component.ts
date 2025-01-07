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
import {CanvasService} from '../../../services/canvas.service';
import {RadiusService} from '../../../services/radius.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-form',
  imports: [
    SliderModule,
    KnobModule,
    ReactiveFormsModule,
    FormsModule,
    CardModule,
    ButtonModule,
    CommonModule
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit{
  @Output()  pointAdded: EventEmitter<any> = new EventEmitter();
  mainForm!: FormGroup;
  yValue: number = 0;
  xValue: number = 0;
  rValue: number = 1;
  loading: boolean = false;
  constructor(private router: Router,
              private authService: AuthService,
              private pointService: PointService,
              private radiusService: RadiusService) {}

  submitMainForm(){

    if (this.xValue < -4 || this.xValue > 4) {
      alert('Х должен быть от -4 до 4.');
      return;
    }
    if (this.yValue < -3 || this.yValue > 5) {
      alert('Y должен быть от -3 до 5.');
      return;
    }
    if (this.rValue <= 0) {
      alert('Радиус должен быть строго больше 0.');
      return;
    }

    this.loading = true;
    const newPoint: Point = {
      x: this.xValue,
      y: this.yValue,
      r: this.rValue,
      isHit: false // по умолчанию. на сервере пересчитаем
    };
    this.pointService.insertPoint(newPoint).subscribe({
      next: (result) => {
        if (result.isHit) {
          newPoint.isHit = result.isHit;
        } else {
          newPoint.isHit = false;
        }
        this.pointAdded.emit(newPoint);
        console.log(newPoint);
      },
      error: (err) => {
        alert('Ошибка сервера: ' + err.message);
      }
    })
    this.loading = false;
  }

  ngOnInit(): void {
    this.mainForm = new FormGroup({
      // 'xValue': new FormControl('', [
      //   Validators.min(-3), Validators.max(5)]),
      // 'yValue': new FormControl('', [
      //   Validators.min(-10), Validators.max(10)])
    })
  }

  onRChange(newRValue: number): void {
    // this.rValue = newRValue; // Обновляем значение r
    this.rValue = +newRValue.toFixed(1);
    this.radiusService.setRadius(this.rValue);         // Вызываем функцию рисования
  }


}
