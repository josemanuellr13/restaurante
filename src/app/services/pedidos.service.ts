import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Pedido } from '../models/Pedido';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(private firebase: AngularFirestore) { }

  // Guardamos un pedido por empezar
  guardarPedido(pedido: Pedido , estado: string) : Promise<any>{
      const pedidosCollection = this.firebase.collection('pedidos');
      const pedidosActivosDoc = pedidosCollection.doc("pedidosActivos")
      const col = pedidosActivosDoc.collection(estado)

      return col.add(pedido.toJSON())
  }

  // Guardamos pedido preparando
  guardarPedidoPreparando(pedido: Pedido) : Promise<any>{
    const pedidosCollection = this.firebase.collection('pedidos');
    const pedidosActivosDoc = pedidosCollection.doc("pedidosActivos")
    const preparandoCol = pedidosActivosDoc.collection("preparando")
    console.log(pedido)
    return preparandoCol.add(pedido.toJSON())
  }
  
  getPedidosListos():Observable<any>{
    return this.firebase.collection("pedidos").doc("pedidosActivos").collection("listo").snapshotChanges()
  }

  getPedidosPorEmpezar(): Observable<any>{
    return this.firebase.collection("pedidos").doc("pedidosActivos").collection("porEmpezar").snapshotChanges()
  }

  getPedidosPreparando(): Observable<any>{
    return this.firebase.collection("pedidos").doc("pedidosActivos").collection("preparando").snapshotChanges()
  }

  
entregarPedido(documentoId) {
  const origenRef = this.firebase.collection("pedidos").doc("pedidosActivos").collection("listo").doc(documentoId);
  const destinoRef = this.firebase.collection("pedidos").doc("historialPedidos").collection("pedidos").doc(documentoId);;

  return origenRef.get().subscribe((doc) => {
    if (doc.exists) {
      const data = doc.data();
      return destinoRef.set(data)
        .then(() => {
          return origenRef.delete();
        })
        .catch((error) => {
          console.error("Error al mover el documento:", error);
          throw error;
        });
    } else {
      throw new Error("El documento no existe en la colección de origen.");
    }
  });
}

  borrarDocByCodTemporal(codTemporal: string, estado: string): Promise<void> {
    const pedidosActivosRef = this.firebase.collection('pedidos').doc('pedidosActivos').ref;
    const porEmpezarQuery = pedidosActivosRef.collection(estado).where('codTemporal', '==', codTemporal);
    return porEmpezarQuery.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc)
        doc.ref.delete();
      });
    });
  }



  cambiarPedidoAPreparando(pedido : Pedido) : Promise<boolean>{
      const pedidosCollection = this.firebase.collection('pedidos');
      const pedidosActivosDoc = pedidosCollection.doc("pedidosActivos")
      const preparandoCol = pedidosActivosDoc.collection("preparando")
      const porEmpezarCol = pedidosActivosDoc.collection("porEmpezar")

      return porEmpezarCol.doc(pedido.id).delete().then(() => {
        return this.guardarPedidoPreparando(pedido).then( () => {
          return true
        })
      })
      .catch((error) => {
        console.log("Error: ", error);
        return false;
      });

      
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
