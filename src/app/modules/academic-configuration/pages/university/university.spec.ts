import { ComponentFixture, TestBed } from '@angular/core/testing';

import { University } from './university';

describe('University', () => {
  let component: University;
  let fixture: ComponentFixture<University>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [University],
    }).compileComponents();

    fixture = TestBed.createComponent(University);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
