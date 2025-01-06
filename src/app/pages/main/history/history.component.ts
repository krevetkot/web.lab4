import {Component, Input, OnInit} from '@angular/core';
import { TableModule } from 'primeng/table';
import { ScrollerModule } from 'primeng/scroller';
import {CardModule} from 'primeng/card';
import {PointService} from '../../../services/point.service';
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
  @Input() points: Point[] = [];

  constructor(private pointService: PointService) {}

  getAllPoints() {
    this.pointService.getPoints().subscribe({
      next: (result) => {
        if (result.data) {
          this.points = result.data;
        }
      },
      error: (err) => {
        alert('Ошибка сервера: ' + err.message);
      }
    })
  }

  ngOnInit(): void {
    // this.getAllPoints();
    this.pointService.points$.subscribe((updatedPoints) => {
      this.points = updatedPoints; // Обновляем список точек
    });
  }

}



