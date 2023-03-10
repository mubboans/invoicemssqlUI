
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng-lts/api';
import { Invoice } from 'src/app/model/invoice';
import { CustomerService } from 'src/app/services/customer.service';
import { InvoiceItemService } from 'src/app/services/invoice-item.service';
import { InvoiceService } from 'src/app/services/invoice.service';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from "html-to-pdfmake"
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
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
  filteredData:any[];
  invoicepdf:boolean=false;
  invoicecontent:any;
  @ViewChild('invoiceId') invoiceId: ElementRef;
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
      invoicedate:new Date(product.invoicedate),
      invoiceno:product.invoiceno,
      customerId:this.mapCustomerwithid(product.customerId),
   
    })
    this.invoiceitem.clear();

    for (let i of product.item) {
      if(i){
        
        this.invoiceitem.push(this.createItem(i));
      } 
      
  }
    // this.invoiceGroup.patchValue({item:product.item},)
    console.log(this.invoiceGroup.value,'patched');
  } 
  
  downloadPdf(obj){ 
    let PDF = new jsPDF('p', 'mm', 'a4');
    this.invoicepdf=true;
    this.invoiceService.getInvoicePdfbyNo(obj.invoiceno).subscribe((x:any)=>{
      
      this.invoicecontent = x;
      
      this.invoiceId.nativeElement.innerHTML =this.invoicecontent;
      let DATA: any = document.getElementById('invoiceId');
        // PDF.html(DATA).then(x=>{PDF.save('invoice-generated.pdf')})
   
      html2canvas(DATA).then((canvas) => {
        console.log(canvas);
        
        let fileWidth = 208;
        let fileHeight = (canvas.height * fileWidth) / canvas.width;
        const FILEURI = canvas.toDataURL('image/png');
       
        let position = 0;
        // console.log(FILEURI,'file');
        
        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
        // PDF.text("hello",position, fileWidth,);
        if(canvas){
          setTimeout(() =>{
            PDF.save('invoice-generated.pdf');
            // pdfMake.createPdf(documentDefinition).open();  
          },5000)
        
      };
      const pdfTable = this.invoiceId.nativeElement;
      
      // var html = htmlToPdfmake(pdfTable.innerHTML,{
      //   defaultStyles:{ // change the default styles
      //     table:{ // for <A>
      //       width:100,
      //       color:'purple', // all links should be 'purple'
      //       decoration:'' ,
      //       th:{
      //         width: 200
      //       }
      //       // remove underline
      //     },
          
      //     li:'' // remove all default styles for <LI>
      //   }
      // });
      // table, td, th {
      //   border: 1px solid black;
      // }
      
      // table {
      //   border-collapse: collapse;
      //   width: 100%;
      // }
      
      // th {
      //   height: 70px;
      // }
      // const documentDefinition = { content: html,};
   
    
    });
    })    
  }
  filterCountry(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered : any[] = [];
    let query = event.query;

    for(let i = 0; i < this.custArray.length; i++) {
        let cdata = this.custArray[i];
        if (cdata.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
          console.log(cdata,'customer data');
            
          filtered.push(cdata);
        }
    }

    this.filteredData = filtered;
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
  getPdf(obj){
    
    this.invoicepdf=true;
    console.log(obj.invoiceno,obj,'pdf');

    this.invoiceService.getInvoicePdfbyNo(obj.invoiceno).subscribe((x:any)=>{
     
       
      // window.open('', "_blank");
      this.invoicecontent = x;
      console.log(typeof x,'html response');
      this.invoiceId.nativeElement.innerHTML =this.invoicecontent;
      console.log(this.invoicecontent);
      
    })
  }
  mapCustomerwithid(ids){
    const d= this.custArray.filter((x,value)=>{
      console.log(x,value);
      
      if(x.id == ids){
        return value

      }
    })  
    return d[0];
  }
  fnSubmit(){
    this.submitted=true;
    const itemarray = this.invoiceGroup.get('item').value
    const items = itemarray.map((x)=>{
      const d = {invoice_itemId:x.invoice_itemId,quantity:x.quantity}
      return d;
    })
    const d=this.invoiceGroup.get('customerId').value
    console.log(d);
     this.invoiceGroup.patchValue({
       customerId:d.id
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
      console.log(this.invoiceGroup.value);
      
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
