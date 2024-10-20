import { Component } from '@angular/core';
import { FocusWithinDirective } from './focus-within/focus-within.directive';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-day-01',
  standalone: true,
  imports: [FocusWithinDirective],
  templateUrl: './day-01.component.html',
  styleUrl: './day-01.component.scss',
  providers: [],
})
export class Day01Component {
  focused: any = null;

  get name(): string {
    return this.focused ? this.focused?.tagName : 'null';
  }

  onFocusWithin(focused: any) {
    console.log(focused);

    this.focused = focused;
  }
}
