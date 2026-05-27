import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSwitch } from './form-switch';

describe('FormSwitch', () => {
  let component: FormSwitch;
  let fixture: ComponentFixture<FormSwitch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormSwitch],
    }).compileComponents();

    fixture = TestBed.createComponent(FormSwitch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
