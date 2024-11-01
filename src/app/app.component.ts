import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Day01Component } from './days/day-01/day-01.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Day02Component } from './days/day-02/day-02.component';
import { Day03Component } from './days/day-03/day-03.component';
import { Day04Component } from './days/day-04/day-04.component';
import { Day05Component } from './days/day-05/day-05.component';
import { Day06Component } from './days/day-06/day-06.component';
import { Day07Component } from './days/day-07/day-07.component';
import { Day08Component } from './days/day-08/day-08.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    CommonModule,
    Day01Component,
    Day02Component,
    Day03Component,
    Day04Component,
    Day05Component,
    Day06Component,
    Day07Component,
    Day08Component,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [],
})
export class AppComponent {
  title = 'rxjs-challenge';
}
