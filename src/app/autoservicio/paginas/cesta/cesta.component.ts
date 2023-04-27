import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { Producto } from '../../../models/Producto'
import { ProductoLinea } from '../../../models/ProductoLinea'

import { SesionLocalService } from 'src/app/services/sesion-local.service';

@Component({
  selector: 'autoservicio-cesta',
  templateUrl: './cesta.component.html',
  styleUrls: ['./cesta.component.css']
})
export class CestaComponent implements OnInit {
  cesta : ProductoLinea[] = []
  
  @Output() alerta = new EventEmitter<string>();

  constructor(private _sesionService : SesionLocalService) { }

  ngOnInit(): void {
    this.actualizarCesta()
  }

  actualizarCesta(){
    this.cesta = this._sesionService.getItem("cesta")
  }

  borrarItemCesta(producto : ProductoLinea){
    this._sesionService.borrarProducto(producto)
    this.alerta.emit("Producto borrado correctamente")
    this.actualizarCesta()
  }

}
