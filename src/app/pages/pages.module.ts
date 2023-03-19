import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagesRoutingModule } from './pages-routing.module';

import { ShareModule } from '../share_module/share/share.module';
import { CustomerComponent } from './customer/customer.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { InvoiceItemComponent } from './invoice-item/invoice-item.component';
import { AboutComponent } from './about/about.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PaymentComponent } from './payment/payment.component';


@NgModule({
  declarations: [
    CustomerComponent,
    InvoiceComponent,
    InvoiceItemComponent,
    AboutComponent,
    DashboardComponent,
    PaymentComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ShareModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class PagesModule { }
