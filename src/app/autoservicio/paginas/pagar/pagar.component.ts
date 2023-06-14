import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/models/Pedido';
import { ProductoLinea } from 'src/app/models/ProductoLinea';
import { SesionLocalService } from 'src/app/services/sesion-local.service';
import { PedidosService } from 'src/app/services/pedidos.service';
import { TurnosService } from 'src/app/services/turnos.service';
import { Timestamp } from '@firebase/firestore';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'autoservicio-pagar',
  templateUrl: './pagar.component.html',
  styleUrls: ['./pagar.component.css']
})
export class PagarComponent implements OnInit {

  cesta : ProductoLinea[] = []
  constructor(private _sesionService : SesionLocalService, private _pedidosService : PedidosService, private _turnosService : TurnosService, private router : Router) { }
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

  mostrandoMensajeFinal = false
  turnoPedido : any
  segundos = 5
  mostrarMensajeFinal(){
    this.mostrandoMensajeFinal = true
    this.segundos = 5

    setTimeout(() => {
      this.router.navigate(['/autoservicio']);
    }, 5000);

    setInterval(() => {
      this.segundos = this.segundos -1
    }, 1000);

  }
  

  async pagarTarjeta(){
    this._turnosService.getNuevoTurno().then( turno => {
      this.turnoPedido = turno
      this.mostrarMensajeFinal()
      let productos = this._sesionService.getItem("cesta")
      let fecha = Timestamp.now()
      let pedido = new Pedido(productos, fecha, turno+"")
      this._pedidosService.guardarPedido(pedido, "porEmpezar")
    })
    
  
  }
}
