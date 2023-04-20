import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
      id:fb.control(''),
      firstName:fb.control('',Validators.required),
      lastName:fb.control('',Validators.required),
      email:fb.control('',Validators.required),
      contact:fb.control('',[Validators.required, this.noWhitespaceValidator]),    
      addressLine1:fb.control('',Validators.required),
      addressLine2:fb.control('',Validators.required),
        city:fb.control('',Validators.required),
        state:fb.control('',Validators.required),
        country:fb.control('',Validators.required),
        pincode:fb.control('',Validators.required),
    })
   }

  ngOnInit(): void {
    this.getCustomer();
  }
  addCustomer(){
    this.submitted = false;
    this.customerDialog= true;
    this.customerForm.reset({})
  }
  noWhitespaceValidator(control: FormControl) {
    const isSpace = (control.value || '').match(/\s/g);
    return isSpace ? {'whitespace': true} : null;
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
    // custome
    this.customerForm.patchValue({name:customer.name,
    id:customer.id,
    firstName:customer.firstName,
    lastName:customer.lastName,
    email:customer.email,
    contact:customer.contact,
    addressLine1:customer.addressLine1,
    addressLine2:customer.addressLine2,
    city:customer.city,
    pincode:customer.pincode,
    state:customer.state,
    country:customer.country
    })
    console.log(this.customerForm.valid);
    
  }
  deleteCustomer(customer){
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the this Customer?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.customerSer.deletCustomerbyId(customer.id).subscribe((x:any)=>{
          if(x.success){
            this.messageService.add({severity:'error', summary: 'Successful', detail: 'Customer Deleted', life: 3000});
            this.getCustomer();
          }
        })
         
      }
  });

  }
  onUpload(event,fileUpload) {
    console.log('call event');
    let File = event.files[0];
    if(File){
      let formData = new FormData();
      formData.append('customercsv',File)
     this.customerSer.uploadCustomerCSV(formData).subscribe((x:any)=>{
      console.log(x,'response');
      if(x.success){
        this.messageService.add({severity: 'info', summary: x.message, detail: 'Save Data'});
        this.getCustomer(); 
      }
     },(err:any)=>{
      this.messageService.add({severity: 'error', summary: err, detail: 'Failed to Save Data is Missing'});
     }
     )
    }
    fileUpload.clear();
    console.log(File);
    
}
fnSubmit(){
  this.submitted = true;
  let id=this.customerForm.get('id').value
  let data = {
    firstName:this.customerForm.get('firstName').value,
    lastName:this.customerForm.get('lastName').value,
    email:this.customerForm.get('email').value,
    contact:this.customerForm.get('contact').value,
    addressLine1:this.customerForm.get('addressLine1').value,
    addressLine2:this.customerForm.get('addressLine2').value,
    city:this.customerForm.get('city').value,
    pincode:this.customerForm.get('pincode').value,
    state:this.customerForm.get('state').value,
    country:this.customerForm.get('country').value,
  }

  if (this.customerForm.valid && (this.submitted && (id !== '' && id != null)) ) {
    this.customerSer.updateCuctomerbyID(id,this.customerForm.value).subscribe((x:any)=>{
      if(x.success){
        this.messageService.add({severity:'custom', summary: 'Successful', detail: 'Customer Updated', life: 3000});
        this.getCustomer();
      }
     })
    }
    else {
      this.customerSer.postCustomer(data).subscribe((x:any)=>{
        if(x.success){
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Customer Added', life: 3000});
          this.getCustomer();
        }
      }
      )
    }
    this.customerDialog = false;
}
}
