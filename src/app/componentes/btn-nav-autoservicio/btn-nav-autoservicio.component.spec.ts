import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnNavAutoservicioComponent } from './btn-nav-autoservicio.component';

describe('BtnNavAutoservicioComponent', () => {
  let component: BtnNavAutoservicioComponent;
  let fixture: ComponentFixture<BtnNavAutoservicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnNavAutoservicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnNavAutoservicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
