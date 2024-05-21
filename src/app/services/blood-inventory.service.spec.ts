import { TestBed } from '@angular/core/testing';

import { BloodInventoryService } from './blood-inventory.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BloodInventoryService', () => {
  let service: BloodInventoryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    }).compileComponents();
    service = TestBed.inject(BloodInventoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
