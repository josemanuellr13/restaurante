export class Producto{
    id?: string;
    nombre: string;
    precio: number;
    categoria:number;
    imagen: string


    constructor(nombre : string, precio: number, categoria : number, imagen: string){
        this.nombre = nombre;
        this.precio = precio;
        this.categoria = categoria;
        this.imagen = imagen;
    }

    Producto(){
        
    }
}