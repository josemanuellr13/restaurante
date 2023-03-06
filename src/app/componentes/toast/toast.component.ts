import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {

  constructor() { }
  @Input() tipo = ""
  @Input() texto = ""
  ngOnInit(): void {
  }

}
