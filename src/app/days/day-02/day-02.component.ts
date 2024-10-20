import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, inject, InjectionToken } from '@angular/core';
import {
  distinctUntilChanged,
  fromEvent,
  map,
  Observable,
  share,
  startWith,
} from 'rxjs';

export const PAGE_VISIBILITY = new InjectionToken<Observable<boolean>>(
  'Shared Observable based on `document visibility changed`',
  {
    factory: () => {
      const documentRef = inject(DOCUMENT);

      return fromEvent(documentRef, 'visibilityChange').pipe(
        startWith(0),
        map(() => documentRef.visibilityState !== 'hidden'),
        distinctUntilChanged(),
        share()
      );
    },
  }
);

@Component({
  selector: 'app-day-02',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './day-02.component.html',
  styleUrl: './day-02.component.scss',
})
export class Day02Component {
  constructor(
    @Inject(PAGE_VISIBILITY) readonly pageVisibility$: Observable<boolean>
  ) {}
}
