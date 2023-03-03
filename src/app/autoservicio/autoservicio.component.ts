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
  empezar : boolean = false
  categoria  = "";
  idproducto = "";
  productoSeleccionado : Producto

  constructor(private route: ActivatedRoute, private _productosService : ProductosService) { }
  

  nav = [{"texto":"Carta","icono":"icono","activo":true},
        {"texto":"Carrito","icono":"icono","activo":false},
        {"texto":"Pagar","icono":"icono","activo":false},
  ]

  categoriasCarta = [
    {"texto":"Ofertas","icon":"icon-oferta"},
    {"texto":"Kebabs","icon":"icon-kebab"},
    {"texto":"Complementos","icon":"icon-fritos"},
    {"texto":"Pizzas","icon":"icon-pizza"},
    {"texto":"Bebidas","icon":"icon-bebida"},
    {"texto":"Postres","icon":"icon-postres"},
    {"texto":"Fritos","icon":""},
  ]
  
  indexItemNavCartaActivo : number = 0

  itemNavAbierto : boolean[] = [true, false, false]

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.categoria = params['categoria'];
      this.idproducto = params['id'];
    }
    );
    // Si no hay ninguna categoria elegimos ofertas
    if(this.categoria == null){
      this.indexItemNavCartaActivo = 0
    }else{
      const indice = this.categoriasCarta.findIndex(categoria => categoria.texto === this.categoria);
      this.indexItemNavCartaActivo = indice
    }

    // Si hay producto seleccionado
    if(this.idproducto != null){
      this._productosService.getProducto(this.idproducto).subscribe(doc =>{
        this.productoSeleccionado = doc
      })
    }

    this.actualizarProductos()
  }

  actualizarProductos(){
    this._productosService.getProductosByCategoria(this.indexItemNavCartaActivo).subscribe(doc => {
      this.productos = [];
      doc.forEach((element: any) => {
        // Metemos los productos en el Array
        this.productos.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      })

    }); 

    
    
  }

  seleccionarItemCarta(i : number){
    this.indexItemNavCartaActivo = i
    this.actualizarProductos()

  }

  activarItemMenu(i: number){
    for(let item of this.nav){
      item.activo = false
    }

    this.nav[i].activo = true

  }

  getProducto(id: string){
    let resultado = this._productosService.getProducto(id)
    console.log(resultado)
  }

}
