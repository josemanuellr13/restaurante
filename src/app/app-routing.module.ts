import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TurnoComponent } from './turno/turno.component';
import { HomeComponent } from './home/home.component';
import { AutoservicioComponent } from './autoservicio/autoservicio.component';
import { PublicidadComponent } from './publicidad/publicidad.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [{
  path:"turno", component: TurnoComponent
},{
  path: "", component : HomeComponent
},{
  path: "publicidad", component : PublicidadComponent
},{
  path:"autoservicio",component : AutoservicioComponent
},
{
  path:"autoservicio/:categoria",component : AutoservicioComponent
},
{
  path:"autoservicio/mipedido",component : AutoservicioComponent
},
{
  path:"autoservicio/producto/:id",component : AutoservicioComponent
},
{
  path:"dashboard",component : DashboardComponent
}
,{
  path:"dashboard/:opcion",component : DashboardComponent
},{
  path:"dashboard/:opcion/:id",component : DashboardComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
