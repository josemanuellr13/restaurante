import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }
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

}
