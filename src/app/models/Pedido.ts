import { ProductoLinea } from "./ProductoLinea";
import { Timestamp } from '@firebase/firestore';
interface PedidoJSON {
    productos: ProductoLinea[]
    codTemporal: string;
    fecha: Timestamp
    toJSON(): {productos: ProductoLinea[], codTemporal: string, fecha: Timestamp};
  }
  
  
export class Pedido implements PedidoJSON {
    id?: string;
    productos : ProductoLinea[]
    fecha : Timestamp;
    codTemporal : string;

    constructor(productos : ProductoLinea[], fecha : Timestamp, codTemporal : string){
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