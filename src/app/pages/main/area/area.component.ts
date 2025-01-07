import {
  AfterViewInit,
  Component,
  ElementRef, EventEmitter,
  Inject,
  Input,
  OnInit, Output,
  PLATFORM_ID,
  Renderer2,
  ViewChild
} from '@angular/core';
import {CanvasService} from '../../../services/canvas.service';
import {CardModule} from 'primeng/card';
import {CommonModule, isPlatformBrowser} from '@angular/common';
import {Point} from '../../../Interfaces/point.interface';
import {PointService} from '../../../services/point.service';


@Component({
  selector: 'app-area',
  imports: [CardModule, CommonModule],
  templateUrl: './area.component.html',
  styleUrl: './area.component.scss'
})
export class AreaComponent implements AfterViewInit{

  @ViewChild('canvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;
  @Output() pointAdded: EventEmitter<any> = new EventEmitter();
  @Input() points: Point[] = [];
  rValue = 1;

  public isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object,
              private canvasService: CanvasService,
              private pointService: PointService) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit(): void {
    if (this.isBrowser){
      this.drawArea();
    }
    this.pointService.points$.subscribe((updatedPoints) => {
      this.points = updatedPoints; // Обновляем список точек
    });
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
    // this.pointAdded.emit(newPoint);
    if (this.isBrowser) {
      this.drawArea();
    }
  }


}
