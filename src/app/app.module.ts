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
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductoComponent } from './componentes/producto/producto.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
