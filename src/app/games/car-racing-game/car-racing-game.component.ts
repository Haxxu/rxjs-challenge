import { Component, OnInit } from '@angular/core';
import { Car, Game, Player, Road } from './interfaces';
import { gameHeight, gameWidth, levelDuration } from './constants';
import {
  BehaviorSubject,
  combineLatest,
  finalize,
  fromEvent,
  interval,
  map,
  noop,
  of,
  scan,
  startWith,
  switchMap,
  takeWhile,
  tap,
} from 'rxjs';
import { updateState } from './state';
import { render, renderGameOver } from './html-renderer';

@Component({
  selector: 'app-car-racing-game',
  standalone: true,
  imports: [],
  templateUrl: './car-racing-game.component.html',
  styleUrl: './car-racing-game.component.scss',
})
export class CarRacingGameComponent implements OnInit {
  private gameSpeed$ = new BehaviorSubject(200);

  private road$ = this.gameSpeed$.pipe(
    switchMap((i) =>
      interval(i).pipe(
        scan(
          (road: Road, _: number): Road => (
            (road.cars = road.cars.filter((c) => c.x < gameHeight - 1)),
            road.cars[0].x === gameHeight / 2
              ? road.cars.push(this.randomCar())
              : noop,
            road.cars.forEach((c) => c.x++),
            road
          ),
          { cars: [this.randomCar()] }
        )
      )
    )
  );

  private keys$ = fromEvent(document, 'keyup').pipe(
    startWith({ code: '' }),
    map((x: any) => x?.code)
  );

  private player$ = this.keys$.pipe(
    scan(
      (player: Player, key: string): Player => (
        (player.y +=
          key === 'ArrowLeft' && player.y > 0
            ? -1
            : key === 'ArrowRight' && player.y < gameWidth - 1
            ? 1
            : 0),
        player
      ),
      { y: 0 }
    )
  );

  private state$ = of({
    score: 1,
    lives: 3,
    level: 1,
    duration: levelDuration,
    interval: 200,
  });

  private game$ = combineLatest([this.state$, this.road$, this.player$]).pipe(
    scan(updateState(this.gameSpeed$)),
    tap(render),
    takeWhile(this.isNotGameOver),
    finalize(renderGameOver)
  );

  ngOnInit(): void {
    this.game$.subscribe();
  }

  private isNotGameOver([state]: Game) {
    return state.lives > 0;
  }

  private car(x: number, y: number): Car {
    return { x, y, scored: false };
  }

  private randomCar(): Car {
    return this.car(0, Math.floor(Math.random() * Math.floor(gameWidth)));
  }
}
