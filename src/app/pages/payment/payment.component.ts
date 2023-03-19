import { Component, OnInit } from '@angular/core';
declare var Cashfree: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  paymentSessionId = "session_865qQHlSgTzVXcRTesyDrYLn2e65s0u5bunLqby5PN9UAa_VIahEU2etSR_oqZLV1sWHV3nFoNcl-k9YNJl7vIxlUbGhVDNEXMT7CB8j5q3v";
  dropinConfig = {
    components: [
        "order-details",
        "card",
        "netbanking",
        "app",
        "upi",
    ],
    onSuccess: function(data){
       //on success
    },
    onFailure: function(data){
       //on success
    },
    style: {
          //to be replaced by the desired values
          backgroundColor: "#ffffff",
          color: "#11385b", 
          fontFamily: "Lato",
          fontSize: "14px",
          errorColor: "#ff0000",
          theme: "light"
          }
}
  constructor() { }

  ngOnInit(): void {
    this.generatePayment();
  }
  generatePayment() {
    const cashfree = new Cashfree(this.paymentSessionId);
  }
  

}
