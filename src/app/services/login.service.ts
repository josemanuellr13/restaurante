import { Injectable } from '@angular/core';
//import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  //constructor(private auth: Auth) { }
  constructor(private afs: AngularFireAuth) { }


  login(email : string, password : string){
    return this.afs.signInWithEmailAndPassword( email, password)
  }
}
