import { Component, OnInit , ViewChild} from '@angular/core';
import { ProductosService } from '../services/productos.service';
import { NgForm } from '@angular/forms';
import { Producto } from '../models/Producto';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild('formGuardarProducto') miFormulario: NgForm;

  constructor(private _productoService : ProductosService) { }

  ngOnInit(): void {
  }

  async guardarProducto(){
    let producto : Producto = this.miFormulario.value
    console.log(this.miFormulario.value);

    let respuesta =  await this._productoService.guardarProducto(producto)

    if(respuesta.id){
      console.log("se inserto correctamente")
    }
    console.log(respuesta)

  }
}
