import { TestBed } from '@angular/core/testing';

import { BloodBankService } from './blood-bank.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BloodBankService', () => {
  let service: BloodBankService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(BloodBankService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
