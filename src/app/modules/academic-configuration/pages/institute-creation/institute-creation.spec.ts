import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituteCreation } from './institute-creation';

describe('InstituteCreation', () => {
  let component: InstituteCreation;
  let fixture: ComponentFixture<InstituteCreation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstituteCreation],
    }).compileComponents();

    fixture = TestBed.createComponent(InstituteCreation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
