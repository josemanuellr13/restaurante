import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/Producto';
import { ProductoLinea } from 'src/app/models/ProductoLinea';

import { SesionLocalService } from 'src/app/services/sesion-local.service';

@Component({
  selector: 'autoservicio-pagar',
  templateUrl: './pagar.component.html',
  styleUrls: ['./pagar.component.css']
})
export class PagarComponent implements OnInit {

  cesta : ProductoLinea[] = []
  constructor(private _sesionService : SesionLocalService) { }
  total : number = 0

  ngOnInit(): void {
    this.cesta = this._sesionService.getItem("cesta")

    let total = 0
    for(let prod of this.cesta){
      console.log(prod.precio)
      let precio =  prod.precio * prod.cantidad
      console.log(precio)
      total +=precio
    }
    this.total = total
  }

}
