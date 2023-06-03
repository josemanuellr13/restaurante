import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = ""
  password = ""
  error : boolean = false
  textoError = "error"
  constructor(private LoginService: LoginService, private router: Router) { }
  mostrandoClave: boolean = false
  
  userData : any = {
    email : "a"
  }
  mostrarClave(){
    if(this.mostrandoClave){
      this.mostrandoClave = false
    }else{
      this.mostrandoClave = true
    }
  }
  
  ngOnInit(): void {
  }

  btnLogin(){
    this.LoginService.SignIn(this.email, this.password).then( response =>  {
      this.userData = this.LoginService.getCurrentUser()
      this.router.navigate(['/']);
      }
    )
    .catch( error => {
      this.error = true
      this.textoError = error
    })
  }
}
