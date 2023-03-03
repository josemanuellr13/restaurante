import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemNavCartaComponent } from './item-nav-carta.component';

describe('ItemNavCartaComponent', () => {
  let component: ItemNavCartaComponent;
  let fixture: ComponentFixture<ItemNavCartaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemNavCartaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemNavCartaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
