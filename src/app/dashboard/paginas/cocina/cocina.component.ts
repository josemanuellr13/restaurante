import { Component, OnInit, ViewChild, Output ,EventEmitter} from '@angular/core';
import { Pedido } from 'src/app/models/Pedido';
import { PedidoEstado } from 'src/app/models/PedidoEstado';
import { PedidosService } from 'src/app/services/pedidos.service';
import { Firestore } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Timestamp } from '@firebase/firestore';



@Component({
  selector: 'pagina-cocina',
  templateUrl: './cocina.component.html',
  styleUrls: ['./cocina.component.css']
})

export class CocinaComponent implements OnInit {
  @Output() datosAlerta = new EventEmitter<{tipo: string, texto: string}>();
  
  constructor(private _pedidosService: PedidosService) { }

  pedidosPorEmpezar : PedidoEstado[] = []
  pedidosPreparando : PedidoEstado[] = []
  pedidos : PedidoEstado[] = []

  mostrarAlerta(tipo : string, mensaje: string){
    console.log("enviando")
    this.datosAlerta.emit({tipo: tipo, texto: mensaje});
  }

  
  obtenerPedidos(){
    this.pedidos = []
    // Obtenemos pedidos por empezar
    this._pedidosService.getPedidosPorEmpezar().subscribe(pedidos => {
    
      pedidos.map(ped => {
        const data = ped.payload.doc.data();
        const id = ped.payload.doc.id;
        let pedido : Pedido = { id, ...data };
        let pedidoEstado : PedidoEstado = new PedidoEstado(pedido, "porempezar")

        let pedidoEncontrado = this.pedidos.find(pedido => pedido.pedido.codTemporal === pedidoEstado.pedido.codTemporal);
        
        if(!pedidoEncontrado){
          this.pedidos.push(pedidoEstado)
        }
      })
    })

    // Obtenemos pedidos preparando
    this._pedidosService.getPedidosPreparando().subscribe(pedidos => {
    
      pedidos.map(ped => {
        const data = ped.payload.doc.data();
        const id = ped.payload.doc.id;
        let pedido : Pedido = { id, ...data };
        let pedidoEstado : PedidoEstado = new PedidoEstado(pedido, "preparando")
        let pedidoEncontrado = this.pedidos.find(pedido => pedido.pedido.codTemporal === pedidoEstado.pedido.codTemporal);
        
        if(!pedidoEncontrado){
          this.pedidos.push(pedidoEstado)
        }
        
      })

      this.pedidos.sort(this.compararFechas)
    })
  }

  // Contamos mins transcurridos
  minutosTranscurridos(desde: Timestamp): number {
    const ahora = new Date();
    const milisegundosTranscurridos = ahora.getTime() - desde.toDate().getTime();
    return Math.floor(milisegundosTranscurridos / 1000 / 60);
  }

  // Cambiamos de estado y lo pasamos a preparando
  preparar(pedido : Pedido){
    let ped : Pedido = new Pedido(pedido.productos, pedido.fecha, pedido.codTemporal)

    Promise.all([
      this._pedidosService.borrarDocByCodTemporal(ped.codTemporal, "porEmpezar"),
      this._pedidosService.guardarPedido(ped, "preparando")
    ]).then(() => {
      this.obtenerPedidos()
      this.mostrarAlerta("exito","Preparando " + pedido.codTemporal + " ")

    }).catch((err) => {
      console.log("Ha ocurrido un error:", err)
    })
}
  
// Cambiamos estado y lo pasamos a listo
  listo(pedido : Pedido){
    let ped : Pedido = new Pedido(pedido.productos, pedido.fecha, pedido.codTemporal)

    Promise.all([
      this._pedidosService.borrarDocByCodTemporal(ped.codTemporal, "preparando"),
      this._pedidosService.guardarPedido(ped, "listo")
    ]).then(() => {
        this.obtenerPedidos()
        this.mostrarAlerta("exito","Pedido " + pedido.codTemporal + " listo")
        
    }).catch((err) => {
      console.log("Ha ocurrido un error:", err)
    })
  }


  ngOnInit(): void {
    this.obtenerPedidos()
  }

  compararFechas(a : PedidoEstado, b : PedidoEstado) : number {
    const fechaA = new Date(a.pedido.fecha.toDate());
    const fechaB = new Date(b.pedido.fecha.toDate());
    
    if (fechaA < fechaB) {
      return 1;
    } else if (fechaA > fechaB) {
      return -1;
    } else {
      return 0;
    }
  }

}
