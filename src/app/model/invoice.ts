import { Customer } from "./customer";

export interface Invoice {
    
        _id?: string;
        createdOn?:string;
       invoicedate?: string;
       totalamount?: number;
        invoiceno?: number;
        customerId?:string;
        item?:orderItem[];
        custdata?:Customer;
        isPartialPayemnt?:boolean;
        paymentDetail?:PaymentDetail;
        paymentId?:string;
        paymentType?:number;
        
    }
export class PaymentDetail{
    cf_link_id?: number;
    customerId?: string;
    customer_details?: any;
    link_amount?: number;
    link_created_at?: string;
    link_currency?: string;
    link_expiry_time?: string;
    link_id?: string;
    link_notify?: any;
    link_partial_payments?: any
    link_purpose?: string;
    link_status?: string;
    link_url?: string;
}

export class orderItem{
    invoice_itemId?:string;
    quatity?:number;
}


