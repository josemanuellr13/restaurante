
import { Pedido } from './Pedido';

export class PedidoEstado {
    id?: string;
    pedido: Pedido;
    estado: string;


    constructor(pedido : Pedido, estado : string){
       this.pedido = pedido
       this.estado = estado;
    }

}