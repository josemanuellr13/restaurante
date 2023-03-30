import { Component, OnInit, Input } from '@angular/core';
import { Producto} from '../../models/Producto'
@Component({
  selector: 'producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  @Input() prod : Producto 


  constructor() { }

  tieneVariosPrec(producto : Producto) : boolean{
    if(producto.precio.length >1 ){
      return true
    } else{
      return false
    }
  }

  ngOnInit(): void {
  }

}
