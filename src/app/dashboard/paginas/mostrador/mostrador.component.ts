import { Component, OnInit , Input, EventEmitter, Output} from '@angular/core';
import { PedidosService } from 'src/app/services/pedidos.service';
import { TurnosService } from 'src/app/services/turnos.service';
import { Timestamp } from '@firebase/firestore';
import { PedidoEstado } from 'src/app/models/PedidoEstado';
import { Pedido } from '../../../models/Pedido';

@Component({
  selector: 'pagina-mostrador',
  templateUrl: './mostrador.component.html',
  styleUrls: ['./mostrador.component.css']
})
export class MostradorComponent implements OnInit {
  @Output() datosAlerta = new EventEmitter<{tipo: string, texto: string}>();

  constructor(private _pedidosService : PedidosService) { }
  listos :  any[] = []

  ngOnInit(): void {
    this.obtenerListo()
  }

  obtenerListo(){
    this._pedidosService.getPedidosListos().subscribe(listos => {
      this.listos = []
      listos.map(ped => {
        
        const data = ped.payload.doc.data();
        const id = ped.payload.doc.id;
        let pedido : Pedido = { id, ...data };
        let pedidoEstado : PedidoEstado = new PedidoEstado(pedido, "listo")
        console.log(pedidoEstado)
        this.listos.push(pedidoEstado)
      })
    }
    );
  }

  minutosTranscurridos(desde: Timestamp): number {
    const ahora = new Date();
    const milisegundosTranscurridos = ahora.getTime() - desde.toDate().getTime();
    return Math.floor(milisegundosTranscurridos / 1000 / 60);
  }


  mostrarAlerta(tipo : string, mensaje: string){
    console.log("enviando")
    this.datosAlerta.emit({tipo: tipo, texto: mensaje});
  }
  entregarPedido(uid : string, codPedido : string){
    this.mostrarAlerta("exito","Pedido "+ codPedido + " ha sido entregado al cliente")
    this.obtenerListo()
    this._pedidosService.entregarPedido(uid)
  }

}
