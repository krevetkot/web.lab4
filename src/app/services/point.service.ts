import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {environment} from '../../environments/environment';
import {Point} from '../Interfaces/point.interface';
import {Response} from '../Interfaces/response.interface';

@Injectable({
  providedIn: 'root'
})
export class PointService {
  pointsApiUrl = environment.pointsApiUrl;
  http = inject(HttpClient)

  private pointsSubject = new BehaviorSubject<Point[]>([]);
  // Observable, к которому можно подписаться в компонентах
  points$ = this.pointsSubject.asObservable();

  constructor() {
  }

  // Метод для обновления массива точек
  updatePoints(points: Point[]) {
    this.pointsSubject.next(points);
  }

  getPoints(): Observable<Response> {
    return this.http.get<Response>(this.pointsApiUrl);
  }

  insertPoint(point: Point) {
    return this.http.post<Response>(this.pointsApiUrl, point);
  }

  deletePoints() {
    return this.http.delete(this.pointsApiUrl);
  }

}

