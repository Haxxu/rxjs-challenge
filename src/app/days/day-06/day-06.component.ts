import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TuiRepeatTimes } from '@taiga-ui/cdk';
import { map, reduce, scan, share, startWith, Subject } from 'rxjs';

const registerSeats = (selected: Set<number>, seat: number) => {
  if (selected.has(seat)) {
    selected.delete(seat);
  } else {
    selected.add(seat);
  }

  return selected;
};

@Component({
  selector: 'app-day-06',
  standalone: true,
  imports: [CommonModule, TuiRepeatTimes],
  templateUrl: './day-06.component.html',
  styleUrl: './day-06.component.scss',
})
export class Day06Component {
  readonly noneMessage = 'nothing';

  readonly selectSeat$ = new Subject<number>();

  readonly selectedMessage$ = this.selectSeat$.pipe(
    scan(registerSeats, new Set<number>()),
    startWith(new Set<number>()),
    map((set) => (set.size ? Array.from(set).join(', ') : this.noneMessage)),
    share()
  );

  readonly cost$ = this.selectSeat$.pipe(
    reduce(registerSeats, new Set()),
    map((selected) => selected.size * 3)
  );
}
