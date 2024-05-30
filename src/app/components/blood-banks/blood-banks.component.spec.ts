import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodBanksComponent } from './blood-banks.component';
import { StoreModule } from '@ngrx/store';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('BloodBanksComponent', () => {
  let component: BloodBanksComponent;
  let fixture: ComponentFixture<BloodBanksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [BloodBanksComponent,
        StoreModule.forRoot([])],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();

    fixture = TestBed.createComponent(BloodBanksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
