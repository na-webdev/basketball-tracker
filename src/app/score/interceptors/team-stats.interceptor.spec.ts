import { TestBed } from '@angular/core/testing';

import { TeamStatsInterceptor } from './team-stats.interceptor';

describe('TeamStatsInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      TeamStatsInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: TeamStatsInterceptor = TestBed.inject(TeamStatsInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
