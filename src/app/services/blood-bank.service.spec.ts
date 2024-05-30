import { TestBed } from '@angular/core/testing';

import { BloodBankService } from './blood-bank.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('BloodBankService', () => {
  let service: BloodBankService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(BloodBankService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
