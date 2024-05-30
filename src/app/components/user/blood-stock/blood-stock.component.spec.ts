import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing'; // Import the HttpClientTestingModule
import { BloodStockComponent } from './blood-stock.component';
import { Store, StoreModule } from '@ngrx/store'; // Import the Store module
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('BloodStockComponent', () => {
  let component: BloodStockComponent;
  let fixture: ComponentFixture<BloodStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [// Import the HttpClientTestingModule
        BloodStockComponent,
        StoreModule.forRoot([])],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();

    fixture = TestBed.createComponent(BloodStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
