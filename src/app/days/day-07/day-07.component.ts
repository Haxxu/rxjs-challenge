import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  distinctUntilChanged,
  fromEvent,
  map,
  pairwise,
  tap,
  throttleTime,
} from 'rxjs';

const THRESHOLD = 500;

@Component({
  selector: 'app-day-07',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './day-07.component.html',
  styleUrl: './day-07.component.scss',
})
export class Day07Component {
  private readonly documentRef = inject(DOCUMENT);

  readonly hidden$ = fromEvent(this.documentRef, 'scroll').pipe(
    throttleTime(50),
    map(() => this.documentRef.documentElement.scrollTop),

    pairwise(),
    map(([prev, next]) => next > THRESHOLD || prev < next),
    distinctUntilChanged()
  );
}
