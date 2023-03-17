import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamResultsCardComponent } from './team-results-card.component';

describe('TeamResultsCardComponent', () => {
  let component: TeamResultsCardComponent;
  let fixture: ComponentFixture<TeamResultsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamResultsCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamResultsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
