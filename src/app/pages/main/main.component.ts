import { Component } from '@angular/core';
import {AreaComponent} from './area/area.component';
import {FormComponent} from './form/form.component';
import {HistoryComponent} from './history/history.component';

@Component({
  selector: 'app-main',
  imports: [
    AreaComponent,
    FormComponent,
    HistoryComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
