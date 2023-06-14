import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Producto } from '../models/Producto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private firebase: AngularFirestore) { }

  guardarProducto(producto: Producto) : Promise<any>{
      return this.firebase.collection("productos").add(producto.toJSON())
  }

  getProductosByCategoria(categoria: number): Observable<any[]> {
    return this.firebase.collection('productos', ref => ref.where('categoria', '==', categoria+""))
      .snapshotChanges();
  }

  getProductos(): Observable<any[]> {
    return this.firebase.collection('productos')
      .snapshotChanges();
  }

  getProducto(id: string) : Observable<any>{
    return this.firebase.collection("productos").doc(id).valueChanges()
  }

  modificarProducto(id: string, producto: Producto): Promise<void> {
    
    return this.firebase.collection('productos').doc(id).update(this.toJSON(producto));
  }

  toJSON(producto : Producto) {
    return {
      nombre: producto.nombre,
      precio: producto.precio,
      categoria:producto.categoria,
      imagen:producto.imagen,
      texto:producto.texto,
      tamanyos:producto.tamanyos
    };
  }

  
  borrarProducto(id : string) : number{
    let res = 0
    this.firebase.collection('productos').doc(id).delete().then(function() {
      res = 1
    }).catch(function(error) {
      res = 0
    });

    return res
  }
}
