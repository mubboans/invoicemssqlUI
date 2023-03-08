import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng-lts/api';
import { Invoice } from 'src/app/model/invoice';
import { CustomerService } from 'src/app/services/customer.service';
import { InvoiceItemService } from 'src/app/services/invoice-item.service';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  invoiceArr:Invoice[];
  invoiceObj:Invoice;
  invoiceDialog:boolean;
  custArray:any[];
  submitted:boolean = false;
  invoiceGroup:FormGroup;
  itemGroup:FormGroup;
  itemArr:any[];
  deleteId:any[];
  loading:boolean= true;
  constructor(private messageService: MessageService,public confirmationService: ConfirmationService,public invoiceitemser:InvoiceItemService,public fb:FormBuilder,public invoiceService:InvoiceService,public customerser:CustomerService) { 
    // this.invoiceGroup=fb.group({
    //      _id:fb.control(''),
    //      createdOn:fb.control('',Validators.required),
    //     invoicedate:fb.control('',Validators.required),
    //     totalamount:fb.control('',Validators.required),
    //     invoiceno:fb.control('',Validators.required),
    //      customerId:fb.control('',Validators.required),
    //      __v:fb.control(''),
    //      custdata:fb.group({
    //       name:fb.control(''),
    //       email:fb.control(''),
    //       contact:fb.control(''),
    //       address:fb.group({
    //         line1:fb.control(''),
    //         line2:fb.control(''),
    //         pincode:fb.control(''),
    //         city:fb.control(''),
    //         state:fb.control(''),
    //         country:fb.control(''),
    //       })
    //      }),
    //      item:fb.array([
        
    //      ]),
    // })
  }

    
    ngOnInit(): void {
    this.getinvoice();
    this.getCustomer();
    this.getInvoiceItem()
    this.invoiceObj ={}
    this.createInvoiceFormgroup()
  }
  createInvoiceFormgroup(){
    this.invoiceGroup=this.fb.group({
      _id:this.fb.control(''),
      createdOn:this.fb.control('',Validators.required),
     invoicedate:this.fb.control('',Validators.required),
     totalamount:this.fb.control('',Validators.required),
     invoiceno:this.fb.control('',Validators.required),
      customerId:this.fb.control('',Validators.required),
      __v:this.fb.control(''),
      custdata:this.fb.group({
       name:this.fb.control(''),
       email:this.fb.control(''),
       contact:this.fb.control(''),
       address:this.fb.group({
         line1:this.fb.control(''),
         line2:this.fb.control(''),
         pincode:this.fb.control(''),
         city:this.fb.control(''),
         state:this.fb.control(''),
         country:this.fb.control(''),
       })
      }),
      item:this.fb.array([
     
      ]),
 })
  }
  get itemInvoice() {
    return <FormArray>this.invoiceGroup.controls['item'];
  }

  editInvoice(product){
    this.createInvoiceFormgroup();
    this.invoiceDialog=true;
    console.log(product,'edit',Array.isArray(product.item));
    // product.item.forEach((element,value) => {
    //   this.itemInvoice.push(this.fb.control(element))
    //   let d={data:element,val:value};
    //   console.log(d);
    // });
    
    this.invoiceGroup.patchValue({
      _id:product._id,
      __v:product.__v,
      totalamount:product.totalamount,
      createdOn:product.createdOn,
      invoicedate:product.invoicedate,
      invoiceno:product.invoiceno,
      customerId:product.customerId,
   
    })
    this.invoiceitem.clear()
    for (let i of product.item) {
      if(i){
        
        this.invoiceitem.push(this.createItem(i));
      } 
      
  }
    // this.invoiceGroup.patchValue({item:product.item},)
    console.log(this.invoiceGroup.value,'patched');
  } 
  selectRow(checkValue) {
    if (checkValue) {
      this.deleteId = this.invoiceArr.map(value => value._id);
    } else {
      this.deleteId = [];
    }
  }
  deleteSelectedProducts(){
    console.log(this.deleteId);
    let id =this.deleteId.map(x=>x._id);
    console.log(id);
    
    this.invoiceService.deleteSelectedInvoice(id).subscribe((x:any)=>{
      if(x.succes){
        this.messageService.add({severity:'error', summary: 'Deleted Invoice', detail: x.deleted, life: 3000});
         this.deleteId=null
         id=[] 
        this.getinvoice();
      }
    })
  }
 deleteInvoice(product){
    // this.invoiceService.deleteInvoice()
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the this Invoice?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.invoiceService.deleteInvoice(product._id).subscribe((x:any)=>{
          if(x.succes){
            this.messageService.add({severity:'error', summary: 'Deleted', detail: 'Invoice Deleted', life: 3000});
            this.getinvoice();
          }
        })
         
      }
  });
  }
getinvoice(){
  this.invoiceService.getInvoice().subscribe((x)=>{
    this.invoiceArr= x.data;
    console.log('invoice fetch',this.invoiceArr);
    this.loading = false; 
  })
}
get invoiceitem() {
	return this.invoiceGroup.get('item') as FormArray;
}

addItem(){
  this.invoiceitem.push(this.createItem());
}
  getCustomer(){
    this.customerser.getCustomer().subscribe((x)=>{
      let data= x.data    
      this.custArray = data.map((x:any)=>{
        const d ={name:x.name,id:x._id} 
        return d;
      })
      console.log(this.custArray);
    })
  }
  getInvoiceItem(){
    this.invoiceitemser.getInvoiceItem().subscribe((x:any)=>{
        this.itemArr= x.data.map((x:any)=>{
          const d = {name:x.name,id:x._id}
          return d;
        })
        console.log(this.itemArr,'item array');
        
    })
  }
  createItem(data?:any): FormGroup {
    return this.fb.group({
      invoice_itemId:this.fb.control(data && data.invoice_itemId ? data.invoice_itemId : '' ,Validators.required),
      invoice_data:this.fb.control(''),
      quantity:this.fb.control(data && data.quantity ? data.quantity : '',Validators.required),
    });
  }
  openNew(){
    // this.createInvoiceFormgroup()
    this.invoiceitem.clear()
    this.invoiceGroup.reset({});
    this.invoiceObj={}
    this.invoiceDialog=true;
    this.invoiceitem.push(this.createItem())
  }
  fnSubmit(){
    this.submitted=true;
    const itemarray = this.invoiceGroup.get('item').value
    const items = itemarray.map((x)=>{
      const d = {invoice_itemId:x.invoice_itemId,quantity:x.quantity}
      return d;
    })

    let invoiceData = {
      customerId:this.invoiceGroup.get('customerId').value,
      item:items,
      invoicedate:this.invoiceGroup.get('invoicedate').value,
      invoiceno:this.invoiceGroup.get('invoiceno').value,
    }
    let datacheck = this.invoiceGroup.get('__v').value
    let id = this.invoiceGroup.get('_id').value; 
    console.log(this.invoiceGroup.value,Array.isArray(itemarray),itemarray,id);
    if(this.invoiceGroup.valid && (this.submitted && (id !== '' || datacheck))){
     this.invoiceGroup.removeControl('_id');
     this.invoiceGroup.removeControl('custdata');
     this.invoiceGroup.removeControl('totalamount')
    this.invoiceService.updateInvoice(id,this.invoiceGroup.value).subscribe((x)=>{
      if(x.succes){
        this.messageService.add({severity:'custom', summary: 'Successful', detail: 'Invoice Updated', life: 3000});
        this.getinvoice();
      }
    })
    }
    else{
      this.invoiceService.postInvoice(invoiceData).subscribe((x:any)=>{
        console.log(x,'data');
        
        if(x.succes){
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Invoice Created', life: 3000});
          this.getinvoice();
        }
        else{
          this.messageService.add({severity:'error', summary: 'Successful', detail:'Error in Posting ', life: 3000});
        }

      })
    }
   
    this.invoiceDialog=false;
  }
}
