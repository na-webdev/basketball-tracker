import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsResultsTrackerComponent } from './teams-results-tracker.component';

describe('TeamsResultsTrackerComponent', () => {
  let component: TeamsResultsTrackerComponent;
  let fixture: ComponentFixture<TeamsResultsTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamsResultsTrackerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamsResultsTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
