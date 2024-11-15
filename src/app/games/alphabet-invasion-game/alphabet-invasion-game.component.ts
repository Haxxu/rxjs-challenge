import { Component, inject, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  fromEvent,
  interval,
  map,
  scan,
  startWith,
  switchMap,
  takeWhile,
} from 'rxjs';
import { Letters, State } from './interfaces';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-alphabet-invasion-game',
  standalone: true,
  imports: [],
  templateUrl: './alphabet-invasion-game.component.html',
  styleUrl: './alphabet-invasion-game.component.scss',
})
export class AlphabetInvasionGameComponent implements OnInit {
  levelChangeThreshold = 20;
  speedAdjust = 50;
  endThreshold = 15;
  gameWidth = 30;

  intervalSubject = new BehaviorSubject(600);

  letter$ = this.intervalSubject.pipe(
    switchMap((i) =>
      interval(i).pipe(
        scan<number, Letters>(
          (letters) => ({
            intrvl: i,
            ltrs: [
              {
                letter: this.randomLetter(),
                yPos: Math.floor(Math.random() * this.gameWidth),
              },
              ...letters.ltrs,
            ],
          }),
          { ltrs: [], intrvl: 0 }
        )
      )
    )
  );

  keys$ = fromEvent(document, 'keydown').pipe(
    startWith({ key: '' } as KeyboardEvent),
    map((e: any) => e.key)
  );

  randomLetter() {
    return String.fromCharCode(
      Math.random() * ('z'.charCodeAt(0) - 'a'.charCodeAt(0)) +
        'a'.charCodeAt(0)
    );
  }

  renderGame(state: State) {
    return (
      (document.body.innerHTML = `Score: ${state.score}, Level: ${state.level} <br/>`),
      state.letters.forEach(
        (l) =>
          (document.body.innerHTML +=
            '&nbsp'.repeat(l.yPos) + l.letter + '<br/>')
      ),
      (document.body.innerHTML +=
        '<br/>'.repeat(this.endThreshold - state.letters.length - 1) +
        '-'.repeat(this.gameWidth))
    );
  }

  renderGameOver() {
    return (document.body.innerHTML += '<br/>GAME OVER!');
  }

  noop() {}

  game$ = combineLatest([this.keys$, this.letter$]).pipe(
    scan<[string, Letters], State>(
      (state, [key, letters]) => (
        letters.ltrs[letters.ltrs.length - 1] &&
        letters.ltrs[letters.ltrs.length - 1].letter === key
          ? ((state.score = state.score + 1), letters.ltrs.pop())
          : this.noop,
        state.score > 0 && state.score % this.levelChangeThreshold === 0
          ? ((letters.ltrs = []),
            (state.level = state.level + 1),
            (state.score = state.score + 1),
            this.intervalSubject.next(letters.intrvl - this.speedAdjust))
          : this.noop,
        { score: state.score, letters: letters.ltrs, level: state.level }
      ),
      { score: 0, letters: [], level: 1 }
    ),
    takeWhile((state) => state.letters.length < this.endThreshold)
  );

  ngOnInit(): void {
    this.game$.subscribe({
      next: this.renderGame.bind(this),
      error: this.noop.bind(this),
      complete: this.renderGameOver.bind(this),
    });
  }
}
