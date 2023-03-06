import { Component, OnInit, ViewChild, Output ,EventEmitter} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductosService } from '../../../services/productos.service';
import { Producto } from '../../../models/Producto';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'pagina-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  constructor(private _productoService : ProductosService, private route: ActivatedRoute) { }

  @Output() datosAlerta = new EventEmitter<{tipo: string, texto: string}>();

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idProductoAmodificar = params['id'];
    }
    );

    console.log
    this.getProductos()
  }

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
    }); 
  }

  //..
  idProductoAmodificar = 0
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

  activarAddProducto(){
    if(this.mostrarAddProducto == true){
      this.mostrarAddProducto = false
    }else{
      this.mostrarAddProducto = true
    }
  }

  // En la tabla de añadir producto, agregamos otro tamaño
  agregarTamanyoProducto(){
    let Tamanyo : string = ""
    this.tamanyosProducto.push(Tamanyo)
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
      console.log(valores.precio)
        producto = new Producto(valores.nombre, valores.precio, valores.categoria, valores.imagen, valores.texto, this.tamanyosProducto)

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
