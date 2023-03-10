import { ProductoLinea } from "./ProductoLinea";
  
interface PedidoJSON {
    productos: ProductoLinea[]
    codTemporal: string;
    fecha: Date
    toJSON(): {productos: ProductoLinea[], codTemporal: string, fecha: Date};
  }
  
  
export class Pedido implements PedidoJSON {
    id?: string;
    productos : ProductoLinea[]
    fecha : Date;
    codTemporal : string;

    constructor(productos : ProductoLinea[], fecha : Date, codTemporal : string){
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