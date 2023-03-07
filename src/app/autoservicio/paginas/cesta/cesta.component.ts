import { Component, OnInit, Input } from '@angular/core';
import { Producto } from '../../../models/Producto'

@Component({
  selector: 'autoservicio-cesta',
  templateUrl: './cesta.component.html',
  styleUrls: ['./cesta.component.css']
})
export class CestaComponent implements OnInit {
  productoFicitcio : Producto = new Producto("Menu Kebab Individual",[7],1,"https://thekebabshop.com/wp-content/uploads/2021/11/Web_Fixed_Full_Wrap_4-1024x1024.png","Mmm delicioso",[""])
  @Input() cesta : Producto[] = [this.productoFicitcio]
  
  constructor() { }

  ngOnInit(): void {
  }

}
