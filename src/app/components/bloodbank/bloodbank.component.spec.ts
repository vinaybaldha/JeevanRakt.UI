import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodbankComponent } from './bloodbank.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BloodbankComponent', () => {
  let component: BloodbankComponent;
  let fixture: ComponentFixture<BloodbankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BloodbankComponent,
        HttpClientTestingModule,
        HttpClientTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BloodbankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
