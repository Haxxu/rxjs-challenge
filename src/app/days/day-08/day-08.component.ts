import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  Observable,
  of,
  OperatorFunction,
  scan,
  startWith,
  switchMap,
} from 'rxjs';
import { FilterPipe } from './filter.pipe';

function requestBackendEmulation(
  search: string
): Observable<readonly string[]> {
  console.log('backend called');

  const tests = ['test1', 'test2', 'test3'].filter(
    (test) => !!search && test.startsWith(search)
  );

  if (tests.length) {
    return of(tests);
  }

  if (search.startsWith('1')) {
    return of(['125', '12', '199']);
  }

  return of([]);
}

export function smartSearch<T>(
  _getSearchFunction: (search: string) => Observable<readonly T[]>,
  _searchDebounceTimeMs: number = 400
): OperatorFunction<string, readonly T[] | null> {
  return (source) =>
    source.pipe(
      debounceTime(_searchDebounceTimeMs),
      scan((prevSearched, current) => {
        return prevSearched !== '' && current?.startsWith(prevSearched)
          ? prevSearched
          : current;
      }, ''),
      distinctUntilChanged(),
      switchMap((value) => _getSearchFunction(value).pipe(startWith(null))),
      startWith([])
    );
}

@Component({
  selector: 'app-day-08',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FilterPipe],
  templateUrl: './day-08.component.html',
  styleUrl: './day-08.component.scss',
})
export class Day08Component {
  readonly control = new FormControl('');

  readonly items$ = this.control.valueChanges.pipe(
    filter((value): value is string => value !== null),
    smartSearch(requestBackendEmulation)
  );

  readonly filterValue = (item: string, value: string): boolean =>
    item.startsWith(value);

  readonly emptyArray = [];
}
