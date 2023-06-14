import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  nombre = ""
  email = ""
  password = ""
  textoError = ""
  error = false
  mostrandoClave = true
  codInvURL = ""

  objetoInvitacion : any
  constructor(private loginService : LoginService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
   
      this.route.params.subscribe(params => {
        this.codInvURL = params['codigo'];
        
        this.ejemplo()
        .then(resultado => {
          if(!resultado){
            this.router.navigate(['/error']);
          }
        })
        .catch(error => {
          console.error(error);
        });
      });
  }

  mostrarClave(){

  }

  async ejemplo() {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const resultado = await this.checkIfCodigoEsValido();
        console.log(resultado);
        resolve(resultado);
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });
  }


  async checkIfCodigoEsValido() {
    return new Promise<boolean>((resolve, reject) => {
      let res = false;
      this.loginService.getAllInvitaciones().subscribe((inv) => {
        inv.map((inv) => {
          const data = inv.payload.doc.data();
          const id = inv.payload.doc.id;
          let invitacion: any = { id, ...data };
          
          if (invitacion.id === this.codInvURL) {
            this.objetoInvitacion = invitacion
            console.log(this.objetoInvitacion)
            res = true;
            console.log("es válido");
          }
        });
  
        resolve(res);
      });
    });
  }

  btnRegistro(){
    this.loginService.registerUser(this.nombre, this.email, this.password, this.objetoInvitacion.ROL).then( () => {
      this.loginService.borrarInvitacionActiva(this.objetoInvitacion.id)
      this.router.navigate(['/login']);
    })
    .catch((error) => {
      this.error = true
      this.textoError = error
    });
  }
}
