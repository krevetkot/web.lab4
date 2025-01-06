import {inject, Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import { environment } from '../../environments/environment';
import {Point} from '../Interfaces/point.interface';
import {Response} from '../Interfaces/loginResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  pointsApiUrl = environment.pointsApiUrl;
  http = inject(HttpClient)

  constructor() { }

  getPoints():Observable<Response>{
    return this.http.get<Response>(this.pointsApiUrl);
  }

}

