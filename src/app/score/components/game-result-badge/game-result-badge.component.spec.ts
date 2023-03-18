import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameResultBadgeComponent } from './game-result-badge.component';

describe('GameResultBadgeComponent', () => {
  let component: GameResultBadgeComponent;
  let fixture: ComponentFixture<GameResultBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameResultBadgeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameResultBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
