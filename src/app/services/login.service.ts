import { Injectable } from '@angular/core';
import * as auth from 'firebase/auth';
import { User } from '../services/user';

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

  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };

    return userRef.set(userData, {
      merge: true,
    });
  }



  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            localStorage.setItem('user', JSON.stringify(this.userData));
            }
        });
      })
      
  }

  async getRole(){
    
  }

  isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null ? true : false;
  }

   // Método para obtener el usuario actual
   getCurrentUser(): any {
    return JSON.parse(localStorage.getItem('user')!);
  }

  logout() {
    this.afAuth.signOut().then(() => {
     console.log("Se cerró sesion")
    }).catch((error) => {
      console.log('Error al cerrar sesión:', error);
    });
  }


  
}
