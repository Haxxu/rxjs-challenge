import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Day01Component } from './days/day-01/day-01.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Day02Component } from './days/day-02/day-02.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    CommonModule,
    Day01Component,
    Day02Component,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [],
})
export class AppComponent {
  title = 'rxjs-challenge';
}
