import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodbankreqComponent } from './bloodbankreq.component';

describe('BloodbankreqComponent', () => {
  let component: BloodbankreqComponent;
  let fixture: ComponentFixture<BloodbankreqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BloodbankreqComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BloodbankreqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
