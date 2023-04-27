import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/models/Pedido';
import { ProductoLinea } from 'src/app/models/ProductoLinea';
import { SesionLocalService } from 'src/app/services/sesion-local.service';
import { PedidosService } from 'src/app/services/pedidos.service';
import { TurnosService } from 'src/app/services/turnos.service';
import { Timestamp } from '@firebase/firestore';

@Component({
  selector: 'autoservicio-pagar',
  templateUrl: './pagar.component.html',
  styleUrls: ['./pagar.component.css']
})
export class PagarComponent implements OnInit {

  cesta : ProductoLinea[] = []
  constructor(private _sesionService : SesionLocalService, private _pedidosService : PedidosService, private _turnosService : TurnosService) { }
  total : number = 0

  ngOnInit(): void {
    this.cesta = this._sesionService.getItem("cesta")

    let total = 0
    for(let prod of this.cesta){
      let precio = prod.precio * prod.cantidad
      total +=precio
    }

    this.total = total
  }

  

  async pagarTarjeta(){
    let cod = this._turnosService.getNuevoTurno()
    console.log(cod)
    let productos = this._sesionService.getItem("cesta")
    let fecha = Timestamp.now()
    let pedido = new Pedido(productos, fecha, cod+"")

    this._pedidosService.guardarPedido(pedido,"porEmpezar")
  }
}
