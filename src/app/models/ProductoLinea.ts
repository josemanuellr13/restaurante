
import { Producto } from "./Producto";

interface ProductoLineaJSON {
    producto: Producto;
    precio:number;
    tamanyo: string;
    cantidad : number;
    toJSON(): {producto : Producto, precio: number, tamanyo : string, cantidad: number};
  }
  
  
export class ProductoLinea implements ProductoLineaJSON {
    id?: string;
    producto : Producto
    precio: number;
    tamanyo:string;
    cantidad: number;


    constructor(producto : Producto, precio: number, tamanyo : string, cantidad: number){
       this.producto = producto;
       this.precio = precio;
       this.tamanyo = tamanyo;
       this.cantidad = cantidad
    }

    toJSON() {
        return {
          producto: this.producto,
          precio : this.precio,
          tamanyo: this.tamanyo,
          cantidad:this.cantidad
        };
      }
    
}