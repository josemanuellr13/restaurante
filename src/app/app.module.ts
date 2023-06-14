import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TurnoComponent } from './turno/turno.component';
import { HomeComponent } from './home/home.component';
import { AutoservicioComponent } from './autoservicio/autoservicio.component';
import { PublicidadComponent } from './publicidad/publicidad.component';
import { BtnNavAutoservicioComponent } from './componentes/btn-nav-autoservicio/btn-nav-autoservicio.component';
import { ItemNavCartaComponent } from './componentes/item-nav-carta/item-nav-carta.component';
import { ItemCartaComponent } from './componentes/item-carta/item-carta.component';
import { FormsModule } from '@angular/forms';


// Importamos modulos de firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';


import { environment } from '../environments/environment';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductoComponent } from './componentes/producto/producto.component';
import { ToastComponent } from './componentes/toast/toast.component';
import { ProductosComponent } from './dashboard/paginas/productos/productos.component';
import { OpcionTamanyoCartaComponent } from './componentes/opcion-tamanyo-carta/opcion-tamanyo-carta.component';
import { CartaComponent } from './autoservicio/paginas/carta/carta.component';
import { CestaComponent } from './autoservicio/paginas/cesta/cesta.component';
import { PagarComponent } from './autoservicio/paginas/pagar/pagar.component';
import { BtnPaginadoTablaComponent } from './componentes/btn-paginado-tabla/btn-paginado-tabla.component';
import { LoginComponent } from './login/login.component';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { CocinaComponent } from './dashboard/paginas/cocina/cocina.component';
import { BtnNavDashboardComponent } from './componentes/btn-nav-dashboard/btn-nav-dashboard.component';
import { MostradorComponent } from './dashboard/paginas/mostrador/mostrador.component';
import { AdministracionComponent } from './dashboard/paginas/administracion/administracion.component';
import { RegistroComponent } from './registro/registro.component';
import { PaginaErrorComponent } from './componentes/pagina-error/pagina-error.component';

@NgModule({
  declarations: [
    AppComponent,
    TurnoComponent,
    HomeComponent,
    AutoservicioComponent,
    PublicidadComponent,
    BtnNavAutoservicioComponent,
    ItemNavCartaComponent,
    ItemCartaComponent,
    DashboardComponent,
    ProductoComponent,
    ToastComponent,
    ProductosComponent,
    OpcionTamanyoCartaComponent,
    CartaComponent,
    CestaComponent,
    PagarComponent,
    BtnPaginadoTablaComponent,
    LoginComponent,
    CocinaComponent,
    BtnNavDashboardComponent,
    MostradorComponent,
    AdministracionComponent,
    RegistroComponent,
    PaginaErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule

  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
