import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'item-nav-carta',
  templateUrl: './item-nav-carta.component.html',
  styleUrls: ['./item-nav-carta.component.css']
})
export class ItemNavCartaComponent implements OnInit {
  @Input() activo = false;
  @Input() texto = "";
  @Input() icon = "";
  
  constructor() { }

  ngOnInit(): void {
  }

}
