import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TurnosService } from '../services/turnos.service';

@Component({
  selector: 'app-turno',
  templateUrl: './turno.component.html',
  styleUrls: ['./turno.component.css']
})
export class TurnoComponent implements OnInit {

  preparando : string[] =  []
  listos : string[] =  []
  puntos : string = ""

  constructor(private _turnoService : TurnosService) { }
  
  puntosSuspensivos(){
    setInterval(() => {
      if(this.puntos.length < 3){
        this.puntos += "."
      }else{
        this.puntos = ""
      }

      }, 800);
  }

  obtenerTurnos(){
    this._turnoService.getTurnos().subscribe(doc => {
      this.preparando = doc.preparando
      this.listos = doc.listo
    }
    );
  }

  ngOnInit(): void {
    this.puntosSuspensivos()
    this.obtenerTurnos()
    
    setInterval(() => {
      this.obtenerTurnos()
    }, 800);
  }

}
