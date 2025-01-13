import {
  AfterViewInit,
  Component,
  ElementRef, EventEmitter,
  Inject,
  Input, OnDestroy,
  OnInit, Output,
  PLATFORM_ID,
  ViewChild
} from '@angular/core';
import {CanvasService} from '../../../services/canvas.service';
import {CardModule} from 'primeng/card';
import {CommonModule, isPlatformBrowser} from '@angular/common';
import {Point} from '../../../Interfaces/point.interface';
import {PointService} from '../../../services/point.service';
import {Subscription} from 'rxjs';
import {RadiusService} from '../../../services/radius.service';
import {environment} from '../../../../environments/environment';


@Component({
  selector: 'app-area',
  imports: [CardModule, CommonModule],
  templateUrl: './area.component.html',
  styleUrl: './area.component.scss'
})
export class AreaComponent implements OnInit, AfterViewInit, OnDestroy{
  private subscription!: Subscription;
  @ViewChild('canvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;
  @Output() pointAdded: EventEmitter<any> = new EventEmitter();
  @Input() points: Point[] = [];
  rValue = environment.defaultR;

  public isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object,
              private canvasService: CanvasService,
              private pointService: PointService,
              private radiusService: RadiusService) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    this.pointService.points$.subscribe((updatedPoints) => {
      this.points = updatedPoints; // Обновляем список точек
      if (this.isBrowser && this.canvasRef?.nativeElement){
        this.drawArea();
      }
    });
    this.subscription = this.radiusService.radius$.subscribe((newRadius) => {
      this.rValue = newRadius;
      if (this.isBrowser && this.canvasRef?.nativeElement){
        this.drawArea();
      }
    });
  }

  ngAfterViewInit(): void {
    this.rValue = environment.defaultR;
    if (this.isBrowser && this.canvasRef?.nativeElement){
      this.drawArea();
    }
  }

  drawArea(): void {
    const canvas = this.canvasRef.nativeElement;
    this.canvasService.drawArea(this.rValue, canvas, this.points);
  }

  onClickFunction(event: MouseEvent): void {
    if (this.isBrowser) {
      const canvas = this.canvasRef.nativeElement;
      const rect = canvas.getBoundingClientRect();
      const koef = this.canvasService.koef;

      const clickX = event.clientX - rect.left;
      const clickY = event.clientY - rect.top;

      const canvasCenterX = canvas.width / 2;
      const canvasCenterY = canvas.height / 2;

      const relativeX = clickX - canvasCenterX;
      const relativeY = canvasCenterY - clickY;

      const graphX = +(relativeX * this.rValue / koef).toFixed(4);
      const graphY = +(relativeY * this.rValue / koef).toFixed(4);

      this.sendPoint(graphX, graphY, this.rValue);
    }
  }

  sendPoint(x: number, y: number, r: number): void {
    const newPoint: Point = {
      x: x,
      y: y,
      r: r,
      isHit: false // По умолчанию. На сервере пересчитаем
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
        if (this.isBrowser) {
          this.drawArea();
        }
      },
      error: (err) => {
        alert('Ошибка сервера: ' + err.message);
      }
    })
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe(); // Освобождаем ресурсы
  }
}
