import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng-lts/api';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  customerForm:FormGroup;
  customerDialog: boolean;
  customerArray:Customer[];
  customerObject:Customer;
  submitted: boolean;
  constructor(public fb:FormBuilder,public customerSer:CustomerService, private messageService: MessageService,public confirmationService: ConfirmationService) {
    this.customerForm = fb.group({
      _id:fb.control(''),
      name:fb.control('',Validators.required),
      email:fb.control('',Validators.required),
      contact:fb.control('',Validators.required),
      __v:fb.control(''),
      address:fb.group({
        line1:fb.control('',Validators.required),
        line2:fb.control('',Validators.required),
        city:fb.control('',Validators.required),
        state:fb.control('',Validators.required),
        country:fb.control('',Validators.required),
        pincode:fb.control('',Validators.required),
      })
    })
   }

  ngOnInit(): void {
    this.getCustomer();
  }
  addCustomer(){
    this.submitted = false;
    this.customerDialog= true;
  }
  getCustomer(){
    this.customerSer.getCustomer().subscribe((x:any)=>{
      this.customerArray = x.data
      console.log('get customer Succesfull');
    })
  }
  editCutomer(customer){
    this.submitted = true;
    this.customerDialog = true;
    this.customerForm.patchValue({name:customer.name,
    _id:customer._id,
    email:customer.email,
    contact:customer.contact,
    address:customer.address,
    __v:customer.__v
    })
    console.log(customer);
    
  }
  deleteCustomer(customer){
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the this Customer?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.customerSer.deletCustomerbyId(customer._id).subscribe((x:any)=>{
          if(x.success){
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Customer Deleted', life: 3000});
            this.getCustomer();
          }
        })
         
      }
  });

  }
fnSubmit(){
  this.submitted = true;
  let id=this.customerForm.get('_id').value
  console.log(id,'id');
  let data = {
    name:this.customerForm.get('name').value,
    email:this.customerForm.get('email').value,
    contact:this.customerForm.get('contact').value,
    address:this.customerForm.get('address').value,
  }
  if (this.customerForm.valid && (this.submitted && id !== '') ) {
    // console.log(event.target.value,event);
    
    this.customerSer.updateCuctomerbyID(id,this.customerForm.value).subscribe((x:any)=>{
      if(x.succes){
        this.messageService.add({severity:'custom', summary: 'Successful', detail: 'Customer Updated', life: 3000});
        this.getCustomer();
      }
     })
    }
    else {
    
      this.customerSer.postCustomer(data).subscribe((x:any)=>{
        if(x.succes){
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Customer Added', life: 3000});
          this.getCustomer();
        }
      }
      )
    
       
    }
    this.customerDialog = false;
}
}
