import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import the HttpClientTestingModule
import { BloodStockComponent } from './blood-stock.component';
import { Store, StoreModule } from '@ngrx/store'; // Import the Store module

describe('BloodStockComponent', () => {
  let component: BloodStockComponent;
  let fixture: ComponentFixture<BloodStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, // Import the HttpClientTestingModule
        BloodStockComponent,
        StoreModule.forRoot([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BloodStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
