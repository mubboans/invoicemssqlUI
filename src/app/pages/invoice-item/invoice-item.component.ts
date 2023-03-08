import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng-lts/api';
import { InvoiceItem } from 'src/app/model/invoice-item';
import { InvoiceItemService } from 'src/app/services/invoice-item.service';

@Component({
  selector: 'app-invoice-item',
  templateUrl: './invoice-item.component.html',
  styleUrls: ['./invoice-item.component.scss']
})
export class InvoiceItemComponent implements OnInit {
  invoiceitemArray: InvoiceItem[];
  sortOrder: number;
  itemDialog: boolean;
  invoiceItemObject: InvoiceItem;
  sortField: string;
  sortOptions = [
    { label: 'Price High to Low', value: '!price' },
    { label: 'Price Low to High', value: 'price' }
  ];
  constructor(public invoiceitem: InvoiceItemService,private messageService: MessageService,public confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.invoiceItemObject={}
    this.getItem();
  }
  onSortChange(event) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    }
    else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }
  addItem() {  
    this.invoiceItemObject={}
    this.itemDialog=true;
  }
  editItem(product) {
    this.itemDialog=true;
    this.invoiceItemObject = {...product}
  }
  deleteItem(product) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the this Customer?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.invoiceitem.deleteInvoiceItem(product._id).subscribe((x:any)=>{
          if(x.succes){
            this.messageService.add({severity:'danger', summary: 'Successful', detail: 'Customer Deleted', life: 3000});
            this.getItem();
          }
        })
         
      }
  });
  }
  getItem() {
    this.invoiceitem.getInvoiceItem().subscribe((x: any) => {
      this.invoiceitemArray = x.data
      console.log('fetch item ');

    })
  }
  fnSubmit(){
    
      if (this.invoiceItemObject._id) {
          this.invoiceitem.updateInvoiceItem(this.invoiceItemObject._id,this.invoiceItemObject).subscribe((x:any)=>{
            if(x.succes){
              this.messageService.add({severity:'info', summary: 'Successful', detail: 'Item Updated', life: 3000});
              this.getItem();
            }
          })
          
      }
      else {
     this.invoiceitem.postInvoiceItem(this.invoiceItemObject).subscribe((x:any)=>{
      if(x.succes){
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Added Invoice-Item Succesfull', life: 3000});
        this.getItem();
      }
     })
          
      }

      this.itemDialog = false;

  
  }
}
