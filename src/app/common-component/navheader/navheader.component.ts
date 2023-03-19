import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng-lts/api';

@Component({
  selector: 'app-navheader',
  templateUrl: './navheader.component.html',
  styleUrls: ['./navheader.component.scss']
})
export class NavheaderComponent implements OnInit {
  items: MenuItem[];
  constructor(public router :Router) { }

  ngOnInit(): void {
    this.items = [
      {
          label:'Customer',
          icon:'pi pi-fw pi-user',
          url:'#/customer'
      },
      {
          label:'Invoice Item',
          icon:'pi pi-fw pi-file',
          url:'#/invoice-item'
      },
      {
          label:'Invoice',
          icon:'pi pi-fw pi-calendar',
          url:'#/invoice'
      },
      {
          label:'About',
          icon:'pi pi-fw pi-info-circle',
          url:'#/about'
      },
      {
        label:'Dashboard',
        icon:"pi pi-fw pi-chart-bar",
        url:'#/dashboard'
      }
  ];
}
navigatetoCustomer(){
  this.router.navigate(['/customer'])
}
}
