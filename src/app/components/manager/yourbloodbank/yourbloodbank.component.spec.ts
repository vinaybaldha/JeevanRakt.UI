import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourbloodbankComponent } from './yourbloodbank.component';

describe('YourbloodbankComponent', () => {
  let component: YourbloodbankComponent;
  let fixture: ComponentFixture<YourbloodbankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YourbloodbankComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(YourbloodbankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
