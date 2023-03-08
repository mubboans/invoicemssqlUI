import { Customer } from "./customer";

export interface Invoice {
    
        _id?: string;
        createdOn?:string;
       invoicedate?: string;
       totalamount?: number;
        invoiceno?: number;
        customerId?:string;
        item?:orderItem[];
        custdata?:Customer
    }


export class orderItem{
    invoice_itemId?:string;
    quatity?:number;
}


