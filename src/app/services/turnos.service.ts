import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})

export class TurnosService {
  turnoActual : number = 0
  administracionCollection = null
  pedidosCollection = null
  
  constructor(private firebase: AngularFirestore) { 
    this.administracionCollection = this.firebase.collection("administracion")
    this.pedidosCollection = this.firebase.collection("pedidos")
    this.pedidosCollection.doc("pedidosActivos").get().subscribe(docSnapshot => {
      if (docSnapshot.exists) {
        this.turnoActual = docSnapshot.data().turnoActual;
        
      } 
    });
  }

  
  getNuevoTurno(): Promise<number> {
    this.aumentarTurno()
    return new Promise((resolve, reject) => {
      this.getTurnos().subscribe(data => {
        const turnoActual = data?.turnoActual;
        this.turnoActual = turnoActual
        console.log('Turno actual:', turnoActual);
        
        resolve(turnoActual);
      }, error => {
        reject(error);
      });
    });
    
  }
  aumentarTurno(){
    const pedidosActivosRef = this.firebase.collection('pedidos').doc('pedidosActivos');
    let nuevoTurno = this.turnoActual +1
    if(nuevoTurno >= 100){
      nuevoTurno = 1
    }
    pedidosActivosRef.update({ turnoActual: nuevoTurno })
    .then(() => {
    })
    .catch(error => {
      console.log(error)
    })
  }

  getPreparando():Observable<any>{
    return this.pedidosCollection.doc("pedidosActivos").collection("preparando").valueChanges()
  }
  getListos():Observable<any>{
    return this.pedidosCollection.doc("pedidosActivos").collection("listo").valueChanges()
  }

  getTurnos(): Observable<any> {
    return this.firebase.collection('pedidos').doc('pedidosActivos').valueChanges();
  }

}
