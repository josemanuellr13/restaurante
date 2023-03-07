import { PedidoProducto } from "./PedidoProducto";

  
interface PedidoJSON {
    productos: PedidoProducto[]
    codTemporal: string;
    fecha: Date
    toJSON(): {productos: PedidoProducto[], codTemporal: string, fecha: Date};
  }
  
  
export class Pedido implements PedidoJSON {
    id?: string;
    productos : PedidoProducto[]
    fecha : Date;
    codTemporal : string;

    constructor(productos : PedidoProducto[], fecha : Date, codTemporal : string){
        this.productos = productos;
        this.fecha = fecha;
        this.codTemporal = codTemporal
    }

    toJSON() {
        return {
          productos:this.productos,
          fecha:this.fecha,
          codTemporal:this.codTemporal
        };
      }
}