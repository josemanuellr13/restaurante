import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class TurnosService {

  administracionCollection = null
  
  preparandoCollection 
  turnos = {
    preparando:["012","014"],
    listo:["024","027"]
  }
  
  constructor(private firebase: AngularFirestore) { 
    this.administracionCollection = this.firebase.collection("administracion")
  }

  setUp(){
    this.administracionCollection.doc("turno").set(this.turnos)
  }

  addPreparando(elemento : string){
    let docRef = this.administracionCollection.doc("turno")
    docRef.get().toPromise().then(doc => {
      if (doc.exists) {
        const data = doc.data();
        console.log(data)
        const preparando = data.preparando;

        preparando.push("prueba");
        docRef.update({ preparando });
      }
    });
  }
  
  getTurnos(): Observable<any> {
    return this.administracionCollection.doc("turno").valueChanges()
  }

 

}
