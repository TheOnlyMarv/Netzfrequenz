import { TestBed } from '@angular/core/testing';

import { FrequencyCurrentService } from './frequency-current.service';

describe('FrequencyCurrentService', () => {
  let service: FrequencyCurrentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrequencyCurrentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
