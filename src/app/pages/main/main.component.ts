import {Component, OnInit} from '@angular/core';
import {AreaComponent} from './area/area.component';
import {FormComponent} from './form/form.component';
import {HistoryComponent} from './history/history.component';
import {MenuComponent} from './menu/menu.component';
import {Point} from '../../Interfaces/point.interface';
import {PointService} from '../../services/point.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-main',
  imports: [
    AreaComponent,
    FormComponent,
    HistoryComponent,
    MenuComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit{
  points: Point[] = [];
  constructor(private pointService: PointService, private router: Router) {}

  getAllPoints() {
    this.pointService.getPoints().subscribe({
      next: (result) => {
        if (result.data) {
          this.points = result.data;
          this.pointService.updatePoints(this.points);
        }
      },
      error: (err) => {
        if (err.status == 0){
          window.alert('Сервер не отвечает');
        } else if (err.status == 403){
          window.alert("Пожалуйста, авторизуйтесь.");
          this.router.navigate(['login']).then();
        }
        else {
          window.alert('Ошибка сервера: ' + err.message);
        }
      }
    })
  }

  ngOnInit(): void {
    this.getAllPoints();
  }

  addPoint(point: Point): void {
    this.points.push(point);
    this.pointService.updatePoints(this.points);
  }

  clearAll(){
    this.points = [];
    this.pointService.updatePoints([]);
  }
}
