import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = ""
  password = ""
  constructor(private LoginService: LoginService) { }
  mostrandoClave: boolean = false
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
    console.log("email = " + this.email)
    this.LoginService.login(this.email, this.password).then( response =>  {
        console.log(response)
        alert("exito")
      }
    )
    .catch( error => {
      console.log(error)
    })
  }
}
