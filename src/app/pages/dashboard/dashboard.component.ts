import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  customerArray:Customer[];
  constructor(public customerService:CustomerService) { }

  ngOnInit(): void {
    console.log(Array.isArray(this.customerArray));
    
this.getCustomer();
  }
  
  getCustomer(){
    this.customerService.getCustomer().subscribe((x:any)=>{
      this.customerArray = x.data
      console.log('get customer Succesfull',typeof this.customerArray);
    })
  }
}
