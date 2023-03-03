import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCartaComponent } from './item-carta.component';

describe('ItemCartaComponent', () => {
  let component: ItemCartaComponent;
  let fixture: ComponentFixture<ItemCartaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemCartaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCartaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
