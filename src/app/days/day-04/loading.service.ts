import { Injectable } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { endWith, map, take } from 'rxjs/operators';

@Injectable()
export class LoadingService {
  load(): Observable<string | number> {
    return interval(100).pipe(
      take(20),
      map((tick) => (tick + 1) * 5),
      endWith('Congratulations, you made it!')
    );
  }
}
