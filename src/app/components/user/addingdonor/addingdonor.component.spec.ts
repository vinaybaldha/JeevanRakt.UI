import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingdonorComponent } from './addingdonor.component';
import { StoreModule } from '@ngrx/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AddingdonorComponent', () => {
  let component: AddingdonorComponent;
  let fixture: ComponentFixture<AddingdonorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AddingdonorComponent,
        StoreModule.forRoot([]),
        HttpClientTestingModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddingdonorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
