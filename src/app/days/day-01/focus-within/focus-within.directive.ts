import {
  Directive,
  ElementRef,
  Inject,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { fromEvent, merge, Subscription } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

@Directive({
  selector: '[focusWithin]',
  standalone: true, // Marking it as standalone
})
export class FocusWithinDirective implements OnDestroy {
  @Output() focusWithin = new EventEmitter<Element | null>();

  private subscription: Subscription;

  constructor(
    @Inject(DOCUMENT) private documentRef: Document,
    private elRef: ElementRef<HTMLElement>
  ) {
    const nativeElement = elRef.nativeElement;

    // Create observable streams for focusin and focusout
    const focusIn$ = fromEvent<FocusEvent>(nativeElement, 'focusin').pipe(
      map((event) => event.target as Element)
    );

    const focusOut$ = fromEvent<FocusEvent>(nativeElement, 'focusout').pipe(
      map((event) =>
        nativeElement.contains(event.relatedTarget as Node) ? null : null
      )
    );

    // Merge the streams and emit distinct focus changes
    this.subscription = merge(focusIn$, focusOut$)
      .pipe(distinctUntilChanged())
      .subscribe((focusedElement) => {
        this.focusWithin.emit(focusedElement);
      });
  }

  // Clean up the subscription when the directive is destroyed
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
