import {Component, OnInit} from '@angular/core';
import { TableModule } from 'primeng/table';
import { ScrollerModule } from 'primeng/scroller';
import {CardModule} from 'primeng/card';

@Component({
  selector: 'app-history',
  imports: [
    TableModule,
    ScrollerModule,
    CardModule
  ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent implements OnInit{
  // points: Point[] = [];
  points = [
    { x: 1, y: 1, r: 1 }
  ];

  addPoint(x: number, y: number, r: number): void {
    this.points.push({ x, y, r });
  }

  // Получение всех точек
  getAllPoints(): Point[] {
    return Object.values(this.points);
  }

  ngOnInit(): void {

  }

}


export interface Point {
  x: number;
  y: number;
  r: number;
}
