import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicConfigTabs } from './academic-config-tabs';

describe('AcademicConfigTabs', () => {
  let component: AcademicConfigTabs;
  let fixture: ComponentFixture<AcademicConfigTabs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AcademicConfigTabs],
    }).compileComponents();

    fixture = TestBed.createComponent(AcademicConfigTabs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
