import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsCardListComponent } from './results-card-list.component';

describe('ResultsCardListComponent', () => {
  let component: ResultsCardListComponent;
  let fixture: ComponentFixture<ResultsCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultsCardListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultsCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
