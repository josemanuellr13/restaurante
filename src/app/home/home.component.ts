import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userData : any
  constructor(private loginService : LoginService, private router: Router) { }


  urls = [{"texto":"Pantalla de turnos","url":"turno"},{"texto":"Autoservicio","url":"publicidad"},{"texto":"Dashboard","url":"dashboard"}]
  
  ngOnInit(): void {
    this.userData = this.loginService.getCurrentUser()
    console.log("Esta logeado?" + this.loginService.isLoggedIn())
  }

  logout(){
    this.loginService.logout()
    this.router.navigate(['/login']);
  }
}
