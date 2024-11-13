import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import {
  fromEvent,
  map,
  Observable,
  shareReplay,
  startWith,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';
import { hsvToRgb, rgbToHex } from './color-tools';

const PALETTE_WIDTH = 200;
const PALETTE_HEIGHT = 200;
const HUE = 197;

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

@Component({
  selector: 'app-day-10',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './day-10.component.html',
  styleUrl: './day-10.component.scss',
})
export class Day10Component {
  documentRef = inject(DOCUMENT);

  private readonly target$$ = new Subject<HTMLElement>();
  private readonly target$ = this.target$$.pipe(shareReplay(1));

  @ViewChild('colorPicker')
  set colorPicker(ref: ElementRef<HTMLDivElement> | undefined) {
    if (ref) {
      this.target$$.next(ref.nativeElement);
    }
  }

  private readonly mouseDown$ = this.target$.pipe(
    switchMap((target) => fromEvent<MouseEvent>(target, 'mousedown'))
  );

  private readonly mouseMove$ = this.target$.pipe(
    switchMap((target) => fromEvent<MouseEvent>(target, 'mousemove'))
  );

  private readonly mouseUp$ = fromEvent<MouseEvent>(
    this.documentRef,
    'mouseup'
  );

  readonly coordinates$ = this.mouseDown$.pipe(
    switchMap((down) =>
      this.mouseMove$.pipe(
        map((move) => [move.offsetX, move.offsetY]),
        startWith([down.offsetX, down.offsetY]),
        map(([x, y]) => [
          clamp(x, 0, PALETTE_WIDTH),
          clamp(y, 0, PALETTE_WIDTH),
        ]),
        takeUntil(this.mouseUp$)
      )
    ),
    startWith([0, 0])
  );

  readonly hsv$: Observable<[number, number, number]> = this.coordinates$.pipe(
    map((coordinates) => [
      HUE,
      coordinates[0] / PALETTE_WIDTH,
      ((PALETTE_HEIGHT - coordinates[1]) / PALETTE_HEIGHT) * 255,
    ])
  );

  readonly rgb$ = this.hsv$.pipe(map(hsvToRgb));

  readonly hex$ = this.rgb$.pipe(map(rgbToHex));
}
