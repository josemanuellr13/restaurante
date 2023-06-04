import { Component, OnInit , Input, EventEmitter, Output} from '@angular/core';
import { TurnosService } from 'src/app/services/turnos.service';

@Component({
  selector: 'pagina-mostrador',
  templateUrl: './mostrador.component.html',
  styleUrls: ['./mostrador.component.css']
})
export class MostradorComponent implements OnInit {
  @Output() datosAlerta = new EventEmitter<{tipo: string, texto: string}>();

  constructor(private _turnoService : TurnosService) { }
  listos : any

  ngOnInit(): void {
    this.obtenerListo()
  }

  obtenerListo(){
    this._turnoService.getListos().subscribe(docs => {
      for (let i = 0; i < docs.length; i++) {
        console.log(docs)
        this.listos.push(docs[i]);
      }
      
    }
    );
  }

}
