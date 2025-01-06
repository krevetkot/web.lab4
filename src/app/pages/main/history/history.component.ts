import {Component, OnInit} from '@angular/core';
import { TableModule } from 'primeng/table';
import { ScrollerModule } from 'primeng/scroller';
import {CardModule} from 'primeng/card';
import {HistoryService} from '../../../services/history.service';
import {Point} from '../../../Interfaces/point.interface';

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
  points: Point[] = [];

  constructor(private historyService: HistoryService) {}
  addPoint(x: number, y: number, r: number, isHit: boolean): void {
    this.points.push({ x, y, r, isHit });
  }

  getAllPoints() {
    this.historyService.getPoints().subscribe({
      next: (result) => {
        if (result.data) {
          this.points = result.data;
          console.log(result);
          console.log(this.points);
        }
      },
      error: (err) => {
        alert('Ошибка сервера: ' + err.message);
      }
      })
  }

  ngOnInit(): void {
    this.getAllPoints();
  }

}



