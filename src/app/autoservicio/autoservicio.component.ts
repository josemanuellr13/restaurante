import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../models/Producto'
import { ProductosService } from '../services/productos.service';


@Component({
  selector: 'app-autoservicio',
  templateUrl: './autoservicio.component.html',
  styleUrls: ['./autoservicio.component.css']
})
export class AutoservicioComponent implements OnInit {
  productos : Producto[] = []
  alerta : boolean = false
  productoFicitcio : Producto = new Producto("Menu Kebab Individual",[7],1,"https://thekebabshop.com/wp-content/uploads/2021/11/Web_Fixed_Full_Wrap_4-1024x1024.png","Mmm delicioso",[""])
  cesta: Producto[] = [this.productoFicitcio]
  mensajeAlerta = ""

  constructor(private route: ActivatedRoute, private _productosService : ProductosService) { }
  

  nav = [{"texto":"Carta","icono":"book","url":"carta"},
        {"texto":"Cesta","icono":"basket3","url":"cesta",},
        {"texto":"Pagar","icono":"credit-card","url":"pagar",},
  ]
  
  

  
  
  

  itemNavAbierto : boolean[] = [true, false, false]

  // Recibiendo por URL
  opcionNav = ""
  categoria  = "";
  idproducto = "";

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.opcionNav = params['opcionNav'];
      this.idproducto = params['idproducto'];
      this.categoria = params['categoria'];

    }
    );
  }

  
  mostrarAlerta(texto : string){
    this.alerta = true
    this.mensajeAlerta = texto
    setTimeout(() => {
      this.alerta = false
    }, 5000); 
  }

  

}
