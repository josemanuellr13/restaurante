import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-turno',
  templateUrl: './turno.component.html',
  styleUrls: ['./turno.component.css']
})
export class TurnoComponent implements OnInit {

  preparando : string[] =  ["012","023","024","012","023","024"]
  listos : string[] =  []

  puntos : string = ""

  constructor() { }
  
  puntosSuspensivos(){
    setInterval(() => {
      if(this.puntos.length < 3){
        this.puntos += "."
      }else{
        this.puntos = ""
      }

      }, 800);
  }

  ngOnInit(): void {
    this.puntosSuspensivos()
  }

}
