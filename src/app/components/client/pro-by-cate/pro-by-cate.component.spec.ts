import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProByCateComponent } from './pro-by-cate.component';

describe('ProByCateComponent', () => {
  let component: ProByCateComponent;
  let fixture: ComponentFixture<ProByCateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProByCateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProByCateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
