import { Injectable } from '@angular/core';
import * as auth from 'firebase/auth';
import { User } from '../services/user';
import { Observable } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  userData: any;

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
  ) {
   
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

 



  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            localStorage.setItem('user', JSON.stringify(this.userData));
            }
        });
      })
      
  }

  getRol() {
    return this.afs
      .collection('users')
      .doc(this.getCurrentUser().uid)
      .valueChanges();
  }

  isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null ? true : false;
  }

   // Método para obtener el usuario actual
   getCurrentUser(): any {
    return JSON.parse(localStorage.getItem('user')!);
  }

  getAllUsers() : Observable<any>{
      return this.afs.collection("users").snapshotChanges()
  }

  logout() {
    this.afAuth.signOut().then(() => {
     console.log("Se cerró sesion")
    }).catch((error) => {
      console.log('Error al cerrar sesión:', error);
    });
  }

  registerUser(name: string, email: string, password: string, role : number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.afAuth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          user.updateProfile({
            displayName: name,
          }).then(() => {
            this.afs.collection('users').doc(user.uid).set({
              displayName: user.displayName,
              email: user.email,
              uid : user.uid,
              rol : role
            }).then(() => {
              resolve();
            }).catch((error) => {
              reject('Error al guardar los datos del usuario en Firestore: ' + error);
            });          }).catch((error) => {
            reject('Error al guardar el nombre: ' + error);
          });
        })
        .catch((error) => {
          reject('Error al registrar el usuario: ' + error);
        });
    });
  }
  
  async addInvitacion(rol: number, codigo: string): Promise<void> {
    try {
      const administracionCollection = this.afs.collection('administracion');
      const invitacionesDoc = administracionCollection.doc('invitaciones');
      const invitacionesActivasCol = invitacionesDoc.collection('invitacionesActivas');
  
      const objetoInvitacion = { ROL: rol, CODIGO: codigo };
  
      await invitacionesActivasCol.add(objetoInvitacion);
  
      console.log('Invitación activa agregada correctamente en Firestore.');
    } catch (error) {
      console.error('Error al agregar la invitación activa en Firestore:', error);
      throw error;
    }
  }

  actualizarRolInvitacion(valor: number, idDoc : string) {
    this.afs
      .collection('administracion')
      .doc('invitaciones')
      .collection("invitacionesActivas")
      .doc(idDoc)
      .update({ ROL: valor })
      .then(() => {
        console.log('Atributo actualizado en Firestore.');
      })
      .catch((error) => {
        console.error('Error al actualizar el atributo:', error);
      });
  }

  getAllInvitaciones() : Observable<any>{
    const administracionCollection = this.afs.collection('administracion');
    const invitacionesDoc = administracionCollection.doc('invitaciones');
    const invitacionesActivasCol = invitacionesDoc.collection('invitacionesActivas');
    return invitacionesActivasCol.snapshotChanges()
  }


  borrarUsuario(documentoId : string){
    const administracionCollection = this.afs.collection('users');
    const invitacionesDoc = administracionCollection.doc(documentoId).delete()
      .then(() => {
        console.log('Usuario borrado correctamente');
      })
      .catch((error) => {
        console.error('Error al borrar el documento:', error);
      });
  }


  borrarInvitacionActiva(documentoId: string) {
    const administracionCollection = this.afs.collection('administracion');
    const invitacionesDoc = administracionCollection.doc('invitaciones');
    const invitacionesActivasCol = invitacionesDoc.collection('invitacionesActivas');
    invitacionesActivasCol.doc(documentoId).delete()
      .then(() => {
        console.log('Documento borrado correctamente.');
      })
      .catch((error) => {
        console.error('Error al borrar el documento:', error);
      });
  }

}
