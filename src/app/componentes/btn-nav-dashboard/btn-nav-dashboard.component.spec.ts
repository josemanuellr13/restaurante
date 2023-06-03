import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnNavDashboardComponent } from './btn-nav-dashboard.component';

describe('BtnNavDashboardComponent', () => {
  let component: BtnNavDashboardComponent;
  let fixture: ComponentFixture<BtnNavDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnNavDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnNavDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
