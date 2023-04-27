import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../../../models/Producto'
import { ProductosService } from '../../../services/productos.service';
import { SesionLocalService } from 'src/app/services/sesion-local.service';
import { ProductoLinea } from '../../../models/ProductoLinea'


@Component({
  selector: 'autoservicio-carta',
  templateUrl: './carta.component.html',
  styleUrls: ['./carta.component.css']
})
export class CartaComponent implements OnInit {

  @Input() categoria : string = "";
  @Input() idproducto = "";
  @Output() alerta = new EventEmitter<string>();

  productos : Producto[] = []
  productoSeleccionado : Producto = new Producto("", [], 0, "", "" , [])
  indexItemNavCartaActivo : number = 0
  indexTamanyoSeleccionado : number = 0
  cantidad : number = 1
  constructor(private _productosService : ProductosService, private _sesionService : SesionLocalService) { }
  
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
    // Si no hay ninguna categoria elegimos ofertas
    if(this.categoria == null){
      this.indexItemNavCartaActivo = 0
    }else{
      const indice = this.categoriasCarta.findIndex(categoria => categoria.texto.toLowerCase() === this.categoria);
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

  modificarCantidad( i : number){
    if(i == 0){
        if(this.cantidad > 1){
          this.cantidad = this.cantidad -1
        }
    }else if(i == 1){
      this.cantidad = this.cantidad +1
    }
  }

  seleccionarTamanyoMenu(i: number){
    this.indexTamanyoSeleccionado = i
  }

  // Falta esto
  mostrarAlerta(texto : string){
    this.alerta.emit(texto)
  }

  addProductoACesta(){
    let tamanyoElegido = this.productoSeleccionado.tamanyos[this.indexTamanyoSeleccionado]
    let precioElegido = this.productoSeleccionado.precio[this.indexTamanyoSeleccionado]

    console.log(this.productoSeleccionado)
    console.log(this.productoSeleccionado.precio.length)
    if(!precioElegido){
      let precio = 0
      for (let i = 0; i < this.productoSeleccionado.precio.length; i++) {
        precio += this.productoSeleccionado.precio[i];
      }
      
     console.log(precio)
    }

    let productoLinea = new ProductoLinea(this.productoSeleccionado, precioElegido, tamanyoElegido, this.cantidad )

    console.log(this.productoSeleccionado.precio)
    console.log(this.productoSeleccionado.precio[this.indexTamanyoSeleccionado])
    console.log(precioElegido)
    

    this._sesionService.addProducto(productoLinea)
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
      this.productos.sort((a, b) => {
        if (a.nombre < b.nombre) {
            return -1;
        }
        if (a.nombre > b.nombre) {
            return 1;
        }
        return 0;
    });
    }); 
  }
} 
