import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'opcion-tamanyo-carta',
  templateUrl: './opcion-tamanyo-carta.component.html',
  styleUrls: ['./opcion-tamanyo-carta.component.css']
})
export class OpcionTamanyoCartaComponent implements OnInit {
  @Input() activo = false
  @Input() nombre = ""
  @Input() precio = ""
  constructor() { }

  ngOnInit(): void {
  }

}
