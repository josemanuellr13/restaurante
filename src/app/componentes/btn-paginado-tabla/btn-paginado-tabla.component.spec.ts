import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnPaginadoTablaComponent } from './btn-paginado-tabla.component';

describe('BtnPaginadoTablaComponent', () => {
  let component: BtnPaginadoTablaComponent;
  let fixture: ComponentFixture<BtnPaginadoTablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnPaginadoTablaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnPaginadoTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
