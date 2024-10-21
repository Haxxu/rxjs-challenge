import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LoadingService } from './loading.service';
import {
  distinctUntilChanged,
  filter,
  map,
  share,
  Subject,
  switchMap,
} from 'rxjs';

@Component({
  selector: 'app-day-04',
  standalone: true,
  imports: [CommonModule],
  providers: [LoadingService],
  templateUrl: './day-04.component.html',
  styleUrl: './day-04.component.scss',
})
export class Day04Component {
  private readonly loadingService = inject(LoadingService);

  private readonly load$ = new Subject<void>();

  private readonly response$ = this.load$.pipe(
    switchMap(() => this.loadingService.load()),
    share()
  );

  result$ = this.response$.pipe(
    map((res) => (typeof res === 'string' ? res : null)),
    distinctUntilChanged()
  );

  readonly loadingProgress$ = this.response$.pipe(filter(Number.isFinite));

  onButtonClick() {
    this.load$.next();
  }
}
