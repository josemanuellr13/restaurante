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

  obtenerPreparando(){
    this._turnoService.getPreparando().subscribe(docs => {
      this.preparando = []
      for (let i = 0; i < docs.length; i++) {
        this.preparando.push(docs[i].codTemporal);
      }
    }
    );
  }

  obtenerListo(){
    this._turnoService.getListos().subscribe(docs => {
      this.listos = []
      for (let i = 0; i < docs.length; i++) {
        this.listos.push(docs[i].codTemporal);
      }
    }
    );
  }


 


  ngOnInit(): void {
    this.puntosSuspensivos()
    

    setTimeout( () => {
      this.obtenerPreparando()
      this.obtenerListo()
    }, 500)
  }

}
