import {Component, EventEmitter, Output} from '@angular/core';
import {MenuItem, PrimeIcons} from 'primeng/api';
import {TableModule} from 'primeng/table';
import {ScrollerModule} from 'primeng/scroller';
import {CardModule} from 'primeng/card';
import {CommonModule} from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import {Router} from '@angular/router';
import {PointService} from '../../../services/point.service';

@Component({
  selector: 'app-menu',
  imports: [TableModule,
    ScrollerModule,
    CardModule,
    CommonModule,
    MenubarModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  @Output() pointAdded: EventEmitter<any> = new EventEmitter();
  items: MenuItem[] = [
    {
      label: 'Delete history',
      icon: PrimeIcons.TRASH,
      command: () => this.clean()
    },
    {
      label: 'Logout',
      icon: PrimeIcons.SIGN_OUT,
      command: () => this.router.navigate(['/login'])
    },
  ];


  constructor(private router: Router, private pointService: PointService) {
  }

  clean() {
    this.pointService.deletePoints().subscribe({
      error: (err) => {
        alert('Ошибка сервера: ' + err.message);
      }
    })
    this.pointAdded.emit(); //в main должен вызваться clearAll
  }

}
