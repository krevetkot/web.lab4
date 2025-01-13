import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RadiusService {
  private radiusSubject = new BehaviorSubject<number>(0); // Начальное значение
  radius$ = this.radiusSubject.asObservable();

  setRadius(r: number): void {
    this.radiusSubject.next(r);
  }
}
