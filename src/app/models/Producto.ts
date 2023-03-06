
interface ProductoJSON {
    nombre: string;
    precio: number[];
    categoria:number;
    imagen: string;
    texto : string;
    tamanyos: string[]
    toJSON(): {nombre : string, precio: number[], categoria : number, imagen: string, texto: string, tamanyos: string[] };
  }
  
  
export class Producto implements ProductoJSON {
    id?: string;
    nombre: string;
    precio: number[];
    categoria:number;
    imagen: string;
    texto : string;
    tamanyos: string[]


    constructor(nombre : string, precio: number[], categoria : number, imagen: string, texto: string, tamanyos: string[]){
        this.nombre = nombre;
        this.precio = precio;
        this.categoria = categoria;
        this.imagen = imagen;
        this.texto = texto;
        this.tamanyos = tamanyos
    }

    toJSON() {
        return {
          nombre: this.nombre,
          precio: this.precio,
          categoria:this.categoria,
          imagen:this.imagen,
          texto:this.texto,
          tamanyos:this.tamanyos
        };
      }

    setTamanyos(tamanyos: string[]){
        this.tamanyos = tamanyos
    }

    Producto(){
    }
    
}