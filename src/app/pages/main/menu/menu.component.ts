import { Component } from '@angular/core';
import {MenuItem, PrimeIcons} from 'primeng/api';
import {TableModule} from 'primeng/table';
import {ScrollerModule} from 'primeng/scroller';
import {CardModule} from 'primeng/card';
import {CommonModule} from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import {Router} from '@angular/router';
// import {MenuItemCommandEvent} from 'primeng/api/menuitem';

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

  clean() {
    console.log('Cleaning history...');
    // потом все сделаю
  }

  constructor(private router: Router) {
  }

}
