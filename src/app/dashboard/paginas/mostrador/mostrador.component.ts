import { Component, OnInit , Input, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'pagina-mostrador',
  templateUrl: './mostrador.component.html',
  styleUrls: ['./mostrador.component.css']
})
export class MostradorComponent implements OnInit {
  @Output() datosAlerta = new EventEmitter<{tipo: string, texto: string}>();

  constructor() { }

  ngOnInit(): void {
  }

}
