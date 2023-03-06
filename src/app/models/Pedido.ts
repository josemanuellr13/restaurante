
  
interface PedidoJSON {
    nombreProducto: string;
    tamanyo: string;
    cantidad:number;
    precio: number;
    fecha: Date
    toJSON(): {nombreProducto : string, tamanyo: string, cantidad : number, precio: number, fecha: Date};
  }
  
  
export class Pedido implements PedidoJSON {
    id?: string;
    nombreProducto: string;
    tamanyo: string;
    cantidad: number;
    precio : number;
    fecha : Date;
    codTemporal : string;

    constructor(nombre : string, tamanyo: string, cantidad : number, precio: number, fecha : Date, codTemporal : string){
        this.nombreProducto = nombre;
        this.tamanyo = tamanyo;
        this.cantidad = cantidad;
        this.precio = precio;
        this.fecha = fecha;
        this.codTemporal = codTemporal
    }

    toJSON() {
        return {
          nombreProducto: this.nombreProducto,
          tamanyo: this.tamanyo,
          cantidad:this.cantidad,
          precio:this.precio,
          fecha:this.fecha
        };
      }
}