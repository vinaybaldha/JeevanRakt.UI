import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingpatientComponent } from './addingpatient.component';

describe('AddingpatientComponent', () => {
  let component: AddingpatientComponent;
  let fixture: ComponentFixture<AddingpatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddingpatientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddingpatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
