import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingpatientComponent } from './addingpatient.component';
import { StoreModule } from '@ngrx/store';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('AddingpatientComponent', () => {
  let component: AddingpatientComponent;
  let fixture: ComponentFixture<AddingpatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [AddingpatientComponent,
        StoreModule.forRoot([]),
        BrowserAnimationsModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();

    fixture = TestBed.createComponent(AddingpatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
