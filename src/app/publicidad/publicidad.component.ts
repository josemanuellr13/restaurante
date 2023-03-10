import { Component, OnInit } from '@angular/core';
import { SesionLocalService } from '../services/sesion-local.service';

@Component({
  selector: 'app-publicidad',
  templateUrl: './publicidad.component.html',
  styleUrls: ['./publicidad.component.css']
})
export class PublicidadComponent implements OnInit {

  constructor(private _sesionService: SesionLocalService) { }

  ngOnInit(): void {
  }

  resetearDatosSesion(){
    this._sesionService.removeItem("cesta")
    this._sesionService.setItem("cesta",[])
  }

}
