import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditbloodbankComponent } from './editbloodbank.component';

describe('EditbloodbankComponent', () => {
  let component: EditbloodbankComponent;
  let fixture: ComponentFixture<EditbloodbankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditbloodbankComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditbloodbankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
