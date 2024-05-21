import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingpatientComponent } from './addingpatient.component';
import { StoreModule } from '@ngrx/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AddingpatientComponent', () => {
  let component: AddingpatientComponent;
  let fixture: ComponentFixture<AddingpatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AddingpatientComponent,
        StoreModule.forRoot([]),
        HttpClientTestingModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddingpatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
