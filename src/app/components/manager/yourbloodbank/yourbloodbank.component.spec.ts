import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourbloodbankComponent } from './yourbloodbank.component';
import { StoreModule } from '@ngrx/store';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('YourbloodbankComponent', () => {
  let component: YourbloodbankComponent;
  let fixture: ComponentFixture<YourbloodbankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [YourbloodbankComponent,
        StoreModule.forRoot([])],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();

    fixture = TestBed.createComponent(YourbloodbankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
