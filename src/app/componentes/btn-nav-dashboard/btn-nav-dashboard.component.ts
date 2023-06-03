import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'btn-nav-dashboard',
  templateUrl: './btn-nav-dashboard.component.html',
  styleUrls: ['./btn-nav-dashboard.component.css']
})
export class BtnNavDashboardComponent implements OnInit {
  @Input() url = ""
  @Input() nombre = ""
  @Input() shortcut = ""
  opcion = ""
  
  constructor(private route: ActivatedRoute) { 
    
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.opcion = params['opcion'];
    }
    );
  }

}
