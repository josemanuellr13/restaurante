import { Component, OnInit, ViewChild, Output ,EventEmitter} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductosService } from '../../../services/productos.service';
import { Producto } from '../../../models/Producto';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'pagina-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  constructor(private _productoService : ProductosService, private route: ActivatedRoute, private loginService : LoginService) { }

  @Output() datosAlerta = new EventEmitter<{tipo: string, texto: string}>();
  rol :  any
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idProductoAmodificar = params['id'];

      if(this.idProductoAmodificar != null){
        this._productoService.getProducto(this.idProductoAmodificar).subscribe( prod => {
          this.productoAmodificar = prod
          console.log(this.productoAmodificar)
          }
        )
      }
    }
    );
    this.loginService.getRol().subscribe((userData: any)  => {
      this.rol = userData.rol
    })
    this.getProductos()
    
  }


  productoAmodificar : Producto
  // Volcamos productos de BBDD en this.productos
  async getProductos(){
    this._productoService.getProductos().subscribe(doc => {
      this.productos = [];
      doc.forEach((element: any) => {
        // Metemos los productos en el Array
        this.productos.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
          
        })
      })

      this.productosPaginado = this.productos
      this.actualizarTabla()
    }); 
  }

  
  //..
  idProductoAmodificar : string = null
  mostrarAddProducto = false
  productos : Producto[] = []

  // Formulario Añadir Producto
  @ViewChild('formGuardarProducto') miFormulario: NgForm;
  selectedCategoria = '1';
  selectedTamanyo = '0';
  alerta :  boolean = false
  tipoAlerta = "exito"
  mensajeAlerta = ""
  Tamanyo : string = ""
  tamanyosProducto : string[] = [""]
  preciosProducto : number[] = [0]
  tieneVariosTamanyos : boolean = false
  
  mostrarAlerta(tipo : string, mensaje: string){
    console.log("enviando")
    this.datosAlerta.emit({tipo: tipo, texto: mensaje});
  }

  // Datos filtrar producto
  nombreProductoFiltrar = ""
  categoriaProductoFiltrar = -1
  precioDesde = null
  precioHasta = null


  compVariosTamanyos() :  boolean{
    return this.productoAmodificar.precio.length > 1;
  }

  filtrarProductos(){
      let datosFiltrados : Producto[] = this.productos
      
      if(this.nombreProductoFiltrar){
        datosFiltrados  = this.productos.filter((producto) => producto.nombre.toLowerCase().includes(this.nombreProductoFiltrar.toLowerCase()));
      }

      if(this.categoriaProductoFiltrar != -1){
        datosFiltrados  = this.productos.filter((producto) => producto.categoria === this.categoriaProductoFiltrar);
      }

      if(this.precioDesde){
        datosFiltrados  = this.productos.filter((producto) => {
          const precioMasBajo = Math.min(...producto.precio);
          return precioMasBajo > this.precioDesde
        } );
      }

      if(this.precioHasta){
        datosFiltrados  = this.productos.filter((producto) => {
          const precioMasAlto = Math.max(...producto.precio);
          return precioMasAlto < this.precioHasta
        });
      }
    

    this.productosPaginado = datosFiltrados
    this.actualizarTabla()
  }


  productosPaginado : Producto[] = []
  productosMostrado : Producto[] = []
  indexPaginadoActual = 0
  maxProductosPaginado = 5
  botonesPaginado = []

  actualizarTabla(){
    let inicio = this.indexPaginadoActual * this.maxProductosPaginado
    let fin = inicio + this.maxProductosPaginado

    let productosAmostrar = this.productosPaginado.slice(inicio, fin);
    let cantBotonesPaginado = Math.ceil(this.productosPaginado.length / this.maxProductosPaginado);

    this.botonesPaginado = []
    this.productosMostrado = productosAmostrar
    for(let i = 0; i < cantBotonesPaginado; i++){
      this.botonesPaginado.push(i)
    }
  }

  resetearFiltrado(){
    this.nombreProductoFiltrar = ""
    this.categoriaProductoFiltrar = -1
    this.precioDesde = null
    this.precioHasta = null
    this.productosPaginado = this.productos
    this.actualizarTabla()
  }

  cambiarPaginado(index : number){
    this.indexPaginadoActual = index
    this.actualizarTabla()
  }

  activarAddProducto(){
    if(this.mostrarAddProducto == true){
      this.mostrarAddProducto = false
    }else{
      this.mostrarAddProducto = true
    }
  } 

  onInputChange(event: any) {
    
    this.filtrarProductos();
  }


  // En la tabla de añadir producto, agregamos otro tamaño
  agregarTamanyoProducto(){
    let Tamanyo : string = ""
    this.tamanyosProducto.push(Tamanyo)
  }

  agregarTamanyoProductoModificando(){
    let Tamanyo = 1
    this.productoAmodificar.precio.push(Tamanyo)
  }

  modificarProducto() {
    this._productoService.modificarProducto(this.idProductoAmodificar, this.productoAmodificar)
      .then(() => {
        this.mostrarAlerta("exito","Producto modificado correctamente")
        console.log('El producto se ha modificado correctamente');
      })
      .catch(error => {
        this.mostrarAlerta("error", error)
        console.error('Error al modificar el producto:', error);
      });
  }

  borrarTamanyoTablaModificando(i : number){
    this.productoAmodificar.precio.splice(i,1)
    this.productoAmodificar.tamanyos.splice(i,1)

  }

  actTieneVariosTamanyos(){
    if(this.tieneVariosTamanyos){
      this.tieneVariosTamanyos = false;
    }else{
      this.tieneVariosTamanyos = true;
    }
  }

  borrarTamanyoTabla(i:number){
      this.tamanyosProducto.splice(i,1)
  }

  async borrarProducto(id : string){
    let res = await this._productoService.borrarProducto(id)
    if( res == 1){
      console.log("borrado")
      this.mostrarAlerta("exito","Producto borrado correctamente")
    }
  }

  async guardarProducto(){
    let valores = this.miFormulario.value
    let producto : Producto = null

    // Si solo hay 1 tamaño/precio
    if(this.tamanyosProducto.length == 1){
      let pre = [valores.precio]
      producto = new Producto(valores.nombre, pre, valores.categoria, valores.imagen, valores.texto, ["Tamaño estándar"])

    // Si hay mas de 1 tamaño
    }else{
        producto = new Producto(valores.nombre, this.preciosProducto, valores.categoria, valores.imagen, valores.texto, this.tamanyosProducto)
    }

    // Si el formulario es valido
    if(this.miFormulario.valid){
      let respuesta =  await this._productoService.guardarProducto(producto)

      if(respuesta.id){
        this.mostrarAlerta("exito","Producto guardado correctamente")
      }else{
        this.mostrarAlerta("error","No se pudo guardar el producto")
      }
      
      this.miFormulario.reset()
      this.tieneVariosTamanyos = false
    // Si no es valido
    }else{
      this.mostrarAlerta("error","Debe rellenar todos los campos")
    }
    

  }
}
