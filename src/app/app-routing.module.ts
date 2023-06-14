import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TurnoComponent } from './turno/turno.component';
import { HomeComponent } from './home/home.component';
import { AutoservicioComponent } from './autoservicio/autoservicio.component';
import { PublicidadComponent } from './publicidad/publicidad.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { RegistroComponent } from './registro/registro.component';
import { PaginaErrorComponent } from './componentes/pagina-error/pagina-error.component';
const routes: Routes = [{
  path:"turno", component: TurnoComponent , canActivate: [AuthGuard] 
},{
  path: "", component : HomeComponent, canActivate: [AuthGuard] 
},{
  path: "publicidad", component : PublicidadComponent
},{
  path:"autoservicio",component : PublicidadComponent, canActivate: [AuthGuard] 
},
{
  path:"autoservicio/:opcionNav",component : AutoservicioComponent
},
{
  path:"autoservicio/:opcionNav/:categoria", component: AutoservicioComponent
}
,{
  path:"autoservicio/:opcionNav/producto/:idproducto",component : AutoservicioComponent
},
{
  path:"invitaciones/:codigo",component : RegistroComponent
}
,
{
  path:"dashboard", component : DashboardComponent, canActivate: [AuthGuard] 
}
,{
  path:"dashboard/:opcion",component : DashboardComponent
},{
  path:"dashboard/:opcion/:id",component : DashboardComponent
},{
  path:"login", component: LoginComponent
},
{
   path: '**', component: PaginaErrorComponent 
},
{ path: 'error', component: PaginaErrorComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
