import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../../../models/Producto'
import { ProductosService } from '../../../services/productos.service';

@Component({
  selector: 'autoservicio-carta',
  templateUrl: './carta.component.html',
  styleUrls: ['./carta.component.css']
})
export class CartaComponent implements OnInit {

  @Input() categoria  = "";
  @Input() idproducto = "";
  @Output() alerta = new EventEmitter<string>();

  productos : Producto[] = []
  productoSeleccionado : Producto
  indexItemNavCartaActivo : number = 0
  indexTamanyoSeleccionado : number = 0

  constructor(private _productosService : ProductosService) { }
  
  // FALTA IMPLEMENTAR ESTO EN JSON
  categoriasCarta = [
    {"texto":"Ofertas","icon":"icon-oferta"},
    {"texto":"Kebabs","icon":"icon-kebab"},
    {"texto":"Complementos","icon":"icon-fritos"},
    {"texto":"Pizzas","icon":"icon-pizza"},
    {"texto":"Bebidas","icon":"icon-bebida"},
    {"texto":"Postres","icon":"icon-postres"},
  ]


  ngOnInit(): void {
    console.log(this.idproducto)

    // Si no hay ninguna categoria elegimos ofertas
    if(this.categoria == null){
      console.log("categoria es nulo")
      this.indexItemNavCartaActivo = 0
    }else{
      console.log("categoria no es nulo")
      const indice = this.categoriasCarta.findIndex(categoria => categoria.texto.toLowerCase() === this.categoria);
      console.log("indice" + indice)
      this.indexItemNavCartaActivo = indice
    }

    // Si hay producto seleccionado
    if(this.idproducto != null){
      this._productosService.getProducto(this.idproducto).subscribe(doc =>{
        this.productoSeleccionado = doc

        this.categoria = this.categoriasCarta[this.productoSeleccionado.categoria].texto
        const indice = this.categoriasCarta.findIndex(categoria => categoria.texto === this.categoria);
        this.indexItemNavCartaActivo = indice
      })

    }

    this.actualizarProductos()
  }

  // Funciones 
  seleccionarItemCarta(i : number){
    this.indexItemNavCartaActivo = i
    this.actualizarProductos()
  }


  seleccionarTamanyoMenu(i: number){
    this.indexTamanyoSeleccionado = i
  }

  // Falta esto
  mostrarAlerta(texto : string){
    this.alerta.emit(texto)
  }

  addProductoACesta(){
    this.mostrarAlerta("Producto añadido a la cesta")
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
} 
