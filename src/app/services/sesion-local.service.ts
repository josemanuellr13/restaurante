import { Injectable } from '@angular/core';
import { Producto } from '../models/Producto';
import { ProductoLinea } from '../models/ProductoLinea';

@Injectable({
  providedIn: 'root'
})
export class SesionLocalService {

  constructor() { 
  }

  public setItem(key: string, value: any): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  public getItem(key: string): any {
    const value = sessionStorage.getItem(key);
    
    if (value) {
      return JSON.parse(value);
    }
    return null;
  }

  // Método para eliminar un elemento de la sesión temporal
  public removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }

  // Método para borrar todos los elementos de la sesión temporal
  public clear(): void {
    sessionStorage.clear();
  }

  public addProducto(producto : ProductoLinea){
    let cesta  : ProductoLinea[] = this.getItem("cesta")
    cesta.push(producto)
    this.setItem("cesta", cesta)
  }

  public borrarProducto( producto : ProductoLinea){
    let cesta: ProductoLinea[] = this.getItem("cesta");
    let nuevaCesta: ProductoLinea[] = cesta.filter((p: ProductoLinea) => p.producto.nombre !== producto.producto.nombre);
    console.log(nuevaCesta)
    this.setItem("cesta", nuevaCesta);
  }

}
