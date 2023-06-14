import { Component, OnInit , Output, EventEmitter} from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { PedidosService } from 'src/app/services/pedidos.service';

@Component({
  selector: 'pagina-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css']
})
export class AdministracionComponent implements OnInit {
  @Output() datosAlerta = new EventEmitter<{tipo: string, texto: string}>();
  invitaciones = []
  usuarios = []
  constructor(private loginService : LoginService) { }

  ngOnInit(): void {
    this.obtenerUsuarios()
    this.getAllInvitaciones()
  }

  mostrarAlerta(tipo : string, mensaje: string){
    console.log("enviando")
    this.datosAlerta.emit({tipo: tipo, texto: mensaje});
  }

  btnGenerar(){
    let datos = [{ producto: 'Producto 1', cantidad: 2 }]

    this.loginService.addInvitacion(0, this.generarCodigoAleatorio()) .then((result) => {
      this.mostrarAlerta("exito","Invitacion generada correctamente")
      console.log('Pedido preparando guardado exitosamente:', result);
    })
    .catch((error) => {
      console.error('Error al guardar el pedido preparando:', error);
    });
  }

 generarCodigoAleatorio(): string {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let codigo = '';
  
    for (let i = 0; i < 10; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
      codigo += caracteres.charAt(indiceAleatorio);
    }
  
    return codigo;
  }
    

  getRol(rol : number) : string{
    let roltext = ""
    switch(rol){
      case 0:
        roltext = "Administrador"
      break;
      
      default:
      roltext = "Cocinero"
      break;
    }
    return roltext 
  }

  borrarInvitacionActiva(id : string){
    this.loginService.borrarInvitacionActiva(id)
  }

  borrarUsuario(uid: string){
    this.loginService.borrarUsuario(uid)
  }

  actualizarRol(valor: number , id : string){
    this.loginService.actualizarRolInvitacion(valor, id)
  }

  getAllInvitaciones(){
    this.loginService.getAllInvitaciones().subscribe(invitaciones => {
      this.invitaciones = []
      invitaciones.map(inv => {
        
        const data = inv.payload.doc.data();
        const id = inv.payload.doc.id;
        let invitacion : any = { id, ...data };
        this.invitaciones.push(invitacion)
        console.log(invitacion)
      })
    })
  }

  obtenerUsuarios(){
    this.loginService.getAllUsers().subscribe(users => {
      this.usuarios = []
      users.map(user => {
        const data = user.payload.doc.data();
        const id = user.payload.doc.id;
        let usuario : any = { id, ...data };
        this.usuarios.push(usuario)
      })
    }
    )
  }
}
