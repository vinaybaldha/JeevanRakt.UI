import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorListComponent } from './donor-list.component';
import { StoreModule } from '@ngrx/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DonorListComponent', () => {
  let component: DonorListComponent;
  let fixture: ComponentFixture<DonorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DonorListComponent,
        StoreModule.forRoot([]),
        HttpClientTestingModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DonorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
