import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNewFormComponent } from './admin-new-form.component';

describe('AdminNewFormComponent', () => {
  let component: AdminNewFormComponent;
  let fixture: ComponentFixture<AdminNewFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminNewFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNewFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
