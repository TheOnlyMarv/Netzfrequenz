import { TestBed } from '@angular/core/testing';

import { FrequencyChartService } from './frequency-chart.service';

describe('ChartService', () => {
  let service: FrequencyChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrequencyChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
