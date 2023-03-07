import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'btn-autoservicio',
  templateUrl: './btn-nav-autoservicio.component.html',
  styleUrls: ['./btn-nav-autoservicio.component.css']
})
export class BtnNavAutoservicioComponent implements OnInit {

  @Input() url = ""
  @Input() texto = ""
  @Input() activo : boolean = false
  @Input() icon = ""
  @Input() cantProductos = 0
  constructor() { }

  ngOnInit(): void {
  }

}
