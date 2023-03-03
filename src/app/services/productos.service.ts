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
      return this.firebase.collection("productos").add(producto)
  }

  getProductosByCategoria(categoria: number): Observable<any[]> {
    return this.firebase.collection('productos', ref => ref.where('categoria', '==', categoria+""))
      .snapshotChanges();
  }

  getProducto(id: string) : Observable<any>{
    console.log(id)
    return this.firebase.collection("productos").doc(id).valueChanges()
  }
}
