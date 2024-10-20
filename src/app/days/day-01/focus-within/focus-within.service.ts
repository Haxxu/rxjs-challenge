import { DOCUMENT } from '@angular/common';
import { ElementRef, Inject, Injectable } from '@angular/core';
import { defer, fromEvent, merge, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Injectable()
export class FocusWithinService extends Observable<Element | null> {
  constructor(
    @Inject(DOCUMENT) documentRef: Document,
    { nativeElement }: ElementRef<HTMLElement>
  ) {
    // Level one: boolean
    const focused$ = merge(
      defer(() => of(nativeElement.contains(documentRef.activeElement))),
      fromEvent(nativeElement, 'focusin').pipe(map(() => true)),
      fromEvent<FocusEvent>(nativeElement, 'focusout').pipe(
        map(({ relatedTarget }) =>
          nativeElement.contains(relatedTarget as Node)
        )
      )
    ).pipe(distinctUntilChanged());

    // Level two: element
    const focusedElement$ = merge(
      defer(() => of(documentRef.activeElement)),
      fromEvent(nativeElement, 'focusin').pipe(map(({ target }) => target)),
      fromEvent<FocusEvent>(nativeElement, 'focusout').pipe(
        map(({ relatedTarget }) => relatedTarget)
      )
    ).pipe(
      map((element: EventTarget | null) =>
        element && nativeElement.contains(element as Node) ? element : null
      ),
      distinctUntilChanged()
    );

    // Level three: element+
    const final$ = merge(
      fromEvent(documentRef, 'focusin'),
      fromEvent(documentRef, 'focusout'),
      of(null)
    ).pipe(
      debounceTime(0),
      map(() =>
        nativeElement.contains(documentRef.activeElement)
          ? documentRef.activeElement
          : null
      ),
      distinctUntilChanged()
    );
    // Beware of NgZone!

    console.log('ehll');

    super((subscriber) => final$.subscribe(subscriber));
  }
}
