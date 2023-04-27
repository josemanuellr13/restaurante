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
  }

  
  getNuevoTurno() : number{
    if(this.turnoActual >= 100){
      this.turnoActual = 1
    }
    this.turnoActual += 1
    return this.turnoActual
  }


  
  
  // Obtenemos el codigo de pedido actual, para sumarle 1
  async getCodTurnoActual() {
    return new Promise<number>((resolve, reject) => {
      this.getTurnos().subscribe(turnos => {
        const listo: string[] = turnos.listo;
        const preparando: string[] = turnos.preparando;
        const combinacion = listo.concat(preparando);
        const codigos = combinacion.map(numero => Number(numero));
        let maximo = Math.max(...codigos);
        
        if(maximo >= 99){
          maximo = 0
        }

        resolve(maximo+1);
      }, error => reject(error));
    });
  }

  getPreparando():Observable<any>{
    return this.pedidosCollection.doc("pedidosActivos").collection("preparando").valueChanges()
  }
  getListos():Observable<any>{
    return this.pedidosCollection.doc("pedidosActivos").collection("listo").valueChanges()
  }

  getTurnos(): Observable<any> {
    return this.administracionCollection.doc("turno").valueChanges()
  }

 

}
