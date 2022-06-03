import { TestBed } from '@angular/core/testing';

import { LoanDetailsService } from './loansdetails.service';

describe('LoanDetailsService', () => {
  let service: LoanDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoanDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
