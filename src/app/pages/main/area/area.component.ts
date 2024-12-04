import {AfterViewInit, Component, ElementRef, Inject, OnInit, PLATFORM_ID, Renderer2, ViewChild} from '@angular/core';
import {CanvasService} from '../../../services/canvas.service';
import {CardModule} from 'primeng/card';
import {CommonModule, isPlatformBrowser} from '@angular/common';


@Component({
  selector: 'app-area',
  imports: [CardModule, CommonModule],
  templateUrl: './area.component.html',
  styleUrl: './area.component.scss'
})
export class AreaComponent implements AfterViewInit{

  // @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('canvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;
  points = [{ x: 1, y: 1, r: 1 }]; // Пример данных
  rValue = 0;

  public isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object, private renderer2: Renderer2,
              private canvasService: CanvasService) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit(): void {
    this.drawArea();
  }

  drawArea(): void {
    const canvas = this.canvasRef.nativeElement;
    this.canvasService.drawArea(this.rValue, canvas, this.points);
  }

  onClickFunction(event: MouseEvent): void {
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

  sendPoint(x: number, y: number, r: number): void {
    this.points.push({ x, y, r });
    this.drawArea();
  }


}
