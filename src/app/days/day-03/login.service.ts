import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginService extends Observable<string> {
  constructor() {
    super((subscriber) =>
      of(Math.random())
        .pipe(
          tap(() => console.log('Login request')),
          delay(2000),
          map((response) => {
            if (response < 0.5) {
              throw new Error('Login failed!');
            }

            return 'David Bowie';
          })
        )
        .subscribe(subscriber)
    );
  }
}
