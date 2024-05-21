import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserprofileComponent } from './userprofile.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserprofileComponent', () => {
  let component: UserprofileComponent;
  let fixture: ComponentFixture<UserprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserprofileComponent, HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
