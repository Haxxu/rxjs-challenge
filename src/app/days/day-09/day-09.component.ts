import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { concatMap, delay, from, of, repeat, startWith } from 'rxjs';

interface Line {
  readonly words: readonly string[];
  readonly duration: number;
}

const SUBTITLES = [
  {
    text: 'It had a begining',
    duration: 1000,
  },
  {
    text: 'It must have an end',
    duration: 1500,
  },
  {
    text: "Don't leave me in darkness",
    duration: 1000,
  },
  {
    text: 'Please give me your hand',
    duration: 2000,
  },
];

@Component({
  selector: 'app-day-09',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './day-09.component.html',
  styleUrl: './day-09.component.scss',
})
export class Day09Component {
  readonly song$ = from([{ text: '', duration: 1000 }, ...SUBTITLES]).pipe(
    concatMap(({ text, duration }, i) =>
      of(null).pipe(
        delay(duration),
        startWith([
          {
            duration,
            words: text.split(' '),
          },
          {
            duration,
            words: SUBTITLES[i]?.text.split(' '),
          },
        ])
      )
    ),
    repeat()
  );

  getDuration({ duration, words }: Line): number {
    return duration / words.length;
  }
}
