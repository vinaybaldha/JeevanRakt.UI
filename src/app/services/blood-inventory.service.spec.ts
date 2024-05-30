import { TestBed } from '@angular/core/testing';

import { BloodInventoryService } from './blood-inventory.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('BloodInventoryService', () => {
  let service: BloodInventoryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();
    service = TestBed.inject(BloodInventoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
