import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import { environment } from '../../environments/environment';
import {Point} from '../Interfaces/point.interface';
import {Response} from '../Interfaces/loginResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class PointService {
  pointsApiUrl = environment.pointsApiUrl;
  http = inject(HttpClient)

  private pointsSubject = new BehaviorSubject<Point[]>([]);

  constructor() { }

  // Observable, к которому можно подписаться в компонентах
  points$ = this.pointsSubject.asObservable();

  // Метод для обновления массива точек
  updatePoints(points: Point[]) {
    this.pointsSubject.next(points);
  }



  getPoints():Observable<Response>{
    return this.http.get<Response>(this.pointsApiUrl);
  }

  insertPoint(point: Point){
    return this.http.post(this.pointsApiUrl, point);
  }

}

