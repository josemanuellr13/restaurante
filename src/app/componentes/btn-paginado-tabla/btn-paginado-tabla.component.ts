import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'btnPaginado',
  templateUrl: './btn-paginado-tabla.component.html',
  styleUrls: ['./btn-paginado-tabla.component.css']
})
export class BtnPaginadoTablaComponent implements OnInit {
  @Input() activo : boolean = false
  @Input() valor : number = 0
  constructor() { }

  ngOnInit(): void {
  }

}
