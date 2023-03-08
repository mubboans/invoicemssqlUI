export class Customer {
    name?: string;
    email?: string;
    contact?: string;
    address?:Address
}
export class Address{
    line1?:string;
    line2?:string;
    pincode?:number;
    city?:string;
    state?:string;
    country?:string;
}
