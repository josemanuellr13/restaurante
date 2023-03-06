import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcionTamanyoCartaComponent } from './opcion-tamanyo-carta.component';

describe('OpcionTamanyoCartaComponent', () => {
  let component: OpcionTamanyoCartaComponent;
  let fixture: ComponentFixture<OpcionTamanyoCartaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpcionTamanyoCartaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpcionTamanyoCartaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
