import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  map,
  Observable,
  startWith,
  Subject,
  switchMap,
  takeWhile,
  timer,
} from 'rxjs';

@Component({
  selector: 'app-day-05',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './day-05.component.html',
  styleUrl: './day-05.component.scss',
})
export class Day05Component {
  readonly resend$ = new Subject<void>();

  readonly countdown$ = this.resend$.pipe(
    startWith(0),
    switchMap(() => countdownFrom(10))
  );
}

function countdownFrom(start: number): Observable<number> {
  return timer(0, 1000).pipe(
    map((index) => start - index),
    takeWhile<number>(Boolean, true)
  );
}
