import { TestBed } from '@angular/core/testing';

import { LatestGameResultsResolver } from './latest-game-results.resolver';

describe('LatestGameResultsResolver', () => {
  let resolver: LatestGameResultsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(LatestGameResultsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
