import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userData : any
  constructor(private loginService : LoginService) { }


  urls = [{"texto":"Pantalla de turnos","url":"turno"},{"texto":"Autoservicio","url":"publicidad"},{"texto":"Dashboard","url":"dashboard"}]
  
  ngOnInit(): void {
    this.userData = this.loginService.getCurrentUser()
    console.log("Esta logeado?" + this.loginService.isLoggedIn())
  }

}
