import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlphabetInvasionGameComponent } from './alphabet-invasion-game.component';

describe('AlphabetInvasionGameComponent', () => {
  let component: AlphabetInvasionGameComponent;
  let fixture: ComponentFixture<AlphabetInvasionGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlphabetInvasionGameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlphabetInvasionGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
