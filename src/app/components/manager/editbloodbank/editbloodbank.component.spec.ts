import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditbloodbankComponent } from './editbloodbank.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BloodBank } from '../../../models/BloodBank';
import { StoreModule } from '@ngrx/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
describe('EditbloodbankComponent', () => {
  let component: EditbloodbankComponent;
  let fixture: ComponentFixture<EditbloodbankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        EditbloodbankComponent,
        StoreModule.forRoot(),
        HttpClientTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: { selectedDonor: new BloodBank() },
        },
        { provide: MatDialogRef, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditbloodbankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
