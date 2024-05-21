import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeRegisterComponent } from './employee-register.component';
import { StoreModule } from '@ngrx/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('EmployeeRegisterComponent', () => {
  let component: EmployeeRegisterComponent;
  let fixture: ComponentFixture<EmployeeRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        EmployeeRegisterComponent,
        StoreModule.forRoot([]),
        HttpClientTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [{ provide: ActivatedRoute, useValue: {} }],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
