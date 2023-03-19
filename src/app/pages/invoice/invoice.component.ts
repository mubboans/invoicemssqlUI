
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
import { PaymentService } from 'src/app/services/payment.service';
import { cashfreeSandbox } from "cashfree-pg-sdk-javascript";
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
  paymentArray=[
    {name:"Create Payment Link",value:1},
    {name:"Create Payment Gateway",value:2}
  ]
  typesmethod=[
    {name:"order-details",value:'order-details'},
    {name:"card",value:'card'},
    {name:"netbanking",value:'netbanking'},
    {name:"app",value:'app'},
    {name:"upi",value:'upi'},
  ]
  paymentGate:boolean=false;
  paymentSessionId="session_865qQHlSgTzVXcRTesyDrYLn2e65s0u5bunLqby5PN9UAa_VIahEU2etSR_oqZLV1sWHV3nFoNcl";
  @ViewChild('invoiceId') invoiceId: ElementRef;
  constructor(private messageService: MessageService,public paymentService:PaymentService,
    public confirmationService: ConfirmationService,public invoiceitemser:InvoiceItemService,public fb:FormBuilder,public invoiceService:InvoiceService,public customerser:CustomerService) { 
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
      paymentType:this.fb.control('',Validators.required),
      createdOn:this.fb.control('',Validators.required),
     invoicedate:this.fb.control('',Validators.required),
     totalamount:this.fb.control('',Validators.required),
     invoiceno:this.fb.control('',Validators.required),
      customerId:this.fb.control('',Validators.required),
    link_currency:this.fb.control({value:'', disabled: true}),
      link_purpose:this.fb.control({value:'', disabled: true}),
      link_notify:this.fb.group({
        send_sms:this.fb.control({value:'', disabled: true}),
        send_email:this.fb.control({value:'', disabled: true})
      }),
      methodtype:this.fb.control(''),
      link_partial_payments:this.fb.control({value:'', disabled: true}), 
      link_minimum_partial_amount:this.fb.control({value:'', disabled: true}),      
      // customer_details:this.fb.group({
      //   customer_name:this.fb.control(''),
      //   country_code:this.fb.control(''),
      //   customer_phone:this.fb.control(''),
      //   customer_email:this.fb.control('')
      // }),
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
 this.invoiceGroup.valueChanges.subscribe((x)=>{
  console.log(x.link_partial_payments);
  if(x && x.paymentType){

    // x.link_currency.value= 'INR',
    this.invoiceGroup.get('link_currency').enable({onlySelf:true});
    this.invoiceGroup.get('link_purpose').enable({onlySelf:true});
    this.invoiceGroup.get('link_partial_payments').enable({onlySelf:true});
    this.invoiceGroup.get('link_notify.send_sms').enable({onlySelf:true});
    this.invoiceGroup.get('link_notify.send_email').enable({onlySelf:true});
    
    if(x && x.link_partial_payments == true){
      this.invoiceGroup.get('link_minimum_partial_amount').enable({onlySelf:true});      
    }
    else{
      this.invoiceGroup.get('link_minimum_partial_amount').disable({onlySelf:true});
    }  
  
  }

})
  }
  get itemInvoice() {
    return <FormArray>this.invoiceGroup.controls['item'];
  }

  editInvoice(product){
    this.createInvoiceFormgroup();
    this.invoiceDialog=true;
    console.log(product,'edit');
    // product.item.forEach((element,value) => {
    //   this.itemInvoice.push(this.fb.control(element))
    //   let d={data:element,val:value};
    //   console.log(d);
    // });
    
    this.invoiceGroup.patchValue({
      _id:product._id,
      __v:product.__v,
      paymentType:product.paymentType,
      link_currency:product.paymentDetail.link_currency,
      link_purpose:product.paymentDetail.link_purpose,

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
    getReadPdf(obj){
      this.invoiceService.getInvoiceReadablePDF(obj.invoiceno).subscribe((x:any)=>{
        const url = window.URL.createObjectURL(x); // create a URL object from the blob
        const link = document.createElement('a'); // create an anchor tag
        link.href = url; // set its href attribute to the blob's URL
        link.download = 'invoice.pdf'; // set its download attribute to the file name
        link.click();
      }),(err:any)=>{
        this.messageService.add({severity:'error', summary: 'Failed', detail: 'Failed to Download', life: 3000});
      } 
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
            
          },5000)
        
      };
      const pdfTable = this.invoiceId.nativeElement;
    });
    })    
  }
  filterCountry(event) {
    let filtered : any[] = [];
    let query = event.query;
    for(let i = 0; i < this.custArray.length; i++) {
        let cdata = this.custArray[i];
        if (cdata.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
          // console.log(cdata,'customer data');
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
    this.loading = false; 
  })
}
get invoiceitem() {
	return this.invoiceGroup.get('item') as FormArray;
}

createPayementGateway(sessioId,component,parent){
  this.getinvoice();
  this.paymentGate=true;
  let cashfree = new cashfreeSandbox.Cashfree(sessioId);
      console.log(cashfreeSandbox,'cashfree check',cashfree);
  if (sessioId == "") {
    alert("No Session ID Found");
    return
  }
  let dropinConfig = {
    components:component,
    onSuccess: function(data){
        parent.innerHTML='';
      if (data.order && data.order.status == "PAID") {
        console.log(data);
        
        alert(JSON.stringify(data));
      }
    },
    onFailure: function(data){
      console.log(data);
      
        alert(data.order.errorText);
    },
    style: {
          //to be replaced by the desired values
          backgroundColor: "#000000",
          color: "#C197D2", 
          fontFamily: "Lato",
          fontSize: "14px",
          errorColor: "#ff0000",
          theme: "dark"
          }
}

cashfree.drop(parent,dropinConfig);
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
    this.invoiceService.getInvoicePdfbyNo(obj.invoiceno).subscribe((x:any)=>{
      this.invoicecontent = x;
      this.invoiceId.nativeElement.innerHTML =this.invoicecontent;
      
    })
  }
  mapCustomerwithid(ids){
    const d= this.custArray.filter((x,value)=>{
      // console.log(x,value);
      
      if(x.id == ids){
        return value

      }
    })  
    return d[0];
  }
  getPaymentStatus(obj,invoice):any{
    this.paymentService.getPaymentStatus(obj).subscribe((x:any)=>{
      if(x.success){
        console.log(x.data.link_status);
        let id = invoice.paymentDetail._id;
        let data = x.data
        this.paymentService.updateStatus(id,data).subscribe((x:any)=>{
          this.messageService.add({severity:'warn', summary: 'Successful', detail: 'Status Updated', life: 3000});
          this.getinvoice();
          console.log(x);
            
        })
        
      }
    },(err)=>{
      return 'pending'
    })

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
    if(d != undefined){
      this.invoiceGroup.patchValue({
        customerId:d.id
      })
    }
    let invoiceData = {
      customerId:this.invoiceGroup.get('customerId').value,
      item:items,
      invoicedate:this.invoiceGroup.get('invoicedate').value,
      invoiceno:this.invoiceGroup.get('invoiceno').value,
      paymentType:this.invoiceGroup.get('paymentType').value,
      link_notify:{
        send_sms:Boolean(this.invoiceGroup.get('link_notify.send_sms').value),
        send_email:Boolean(this.invoiceGroup.get('link_notify.send_email').value)
      },
      link_partial_payments:Boolean(this.invoiceGroup.get('link_partial_payments').value),
      link_minimum_partial_amount:this.invoiceGroup.get('link_minimum_partial_amount').value,
      link_currency:this.invoiceGroup.get('link_currency').value.toUpperCase(),
      link_purpose:this.invoiceGroup.get('link_purpose').value,
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
          if(x.paymentType==2){
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Invoice Created', life: 3000}); 
            let sesID = x.data.payment_session_id;
            let component = this.invoiceGroup.get('methodtype').value;
            let parent = document.getElementById("drop_in_container");
            this.createPayementGateway(sesID,component,parent)
          }
          else{
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Invoice Created', life: 3000});
            this.getinvoice();
            const link = document.createElement('a');
            link.target = '_blank';
            link.href = x.link;
            link.setAttribute('visibility', 'hidden');
            link.click();
          }
       
        
        }
        // else{
        //   this.messageService.add({severity:'error', summary: 'Successful', detail:'Error in Posting ', life: 3000});
        // }

      },(err)=>{
        this.messageService.add({severity:'error', summary: 'Failed', detail:'Error in Posting ', life: 3000});
      })
    }
   
    this.invoiceDialog=false;
  }
}
