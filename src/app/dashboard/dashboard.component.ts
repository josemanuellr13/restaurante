import { Component, OnInit , ViewChild} from '@angular/core';
import { ProductosService } from '../services/productos.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private _productoService : ProductosService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.opcion = params['opcion'];
    }
    );
  }
  
  // Ajustes alerta
  opcion = ""
  alerta :  boolean = false
  tipoAlerta = "exito"
  mensajeAlerta = ""


  mostrarAlerta(evento: { tipo: string, texto: string }) {
    console.log("recibiendo")
    this.tipoAlerta = evento.tipo;
    this.mensajeAlerta = evento.texto;
    this.alerta = true;

    setTimeout(() => {
      this.alerta = false;
      location.reload();
    }, 3000);
  } 
}
