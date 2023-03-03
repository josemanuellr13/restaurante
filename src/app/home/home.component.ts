import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }
  urls = [{"texto":"Pantalla de turnos","url":"turno"},{"texto":"Autoservicio","url":"publicidad"},{"texto":"Dashboard","url":"dashboard"}]
  ngOnInit(): void {
  }

}
