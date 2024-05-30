import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingdonorComponent } from './addingdonor.component';
import { StoreModule } from '@ngrx/store';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('AddingdonorComponent', () => {
  let component: AddingdonorComponent;
  let fixture: ComponentFixture<AddingdonorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [AddingdonorComponent,
        StoreModule.forRoot([]),
        BrowserAnimationsModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();

    fixture = TestBed.createComponent(AddingdonorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
