import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  catchError,
  ignoreElements,
  map,
  Observable,
  of,
  repeat,
  retry,
  share,
  startWith,
  Subject,
  switchMap,
  timer,
} from 'rxjs';
import { LoginService } from './login.service';

@Component({
  selector: 'app-day-03',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './day-03.component.html',
  styleUrl: './day-03.component.scss',
})
export class Day03Component {
  private readonly service: Observable<string> = inject(LoginService);

  readonly submit$ = new Subject<void>();

  readonly request$ = this.submit$.pipe(
    switchMap(() => this.service.pipe(startWith(''))),
    share()
  );

  readonly user$ = this.request$.pipe(retry());

  readonly error$ = this.request$.pipe(
    ignoreElements(),
    catchError((e) => of(e)),
    repeat(),
    switchMap((e) => timer(5000).pipe(startWith(e)))
  );

  readonly disabled$ = this.request$.pipe(
    map(() => true),
    catchError(() => of(false)),
    repeat()
  );
}
