
  
interface PedidoProductoJSON {
    nombreProducto: string;
    tamanyo: string;
    cantidad:number;
    precio: number;
    toJSON(): {nombreProducto : string, tamanyo: string, cantidad : number, precio: number};
  }
  
  
export class PedidoProducto implements PedidoProductoJSON {
    id?: string;
    nombreProducto: string;
    tamanyo: string;
    cantidad: number;
    precio : number;

    constructor(nombre : string, tamanyo: string, cantidad : number, precio: number){
        this.nombreProducto = nombre;
        this.tamanyo = tamanyo;
        this.cantidad = cantidad;
        this.precio = precio;
    }

    toJSON() {
        return {
          nombreProducto: this.nombreProducto,
          tamanyo: this.tamanyo,
          cantidad:this.cantidad,
          precio:this.precio,

        };
      }
}