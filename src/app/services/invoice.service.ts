import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(public http:HttpClient) { }

getInvoice():Observable<any>{
  return this.http.get<any>(environment.serverUrl + "invoice/get/all/invoice").pipe(
    map(x=>{
      return x;
    }),
    catchError(this.handleError)
  )
}

getInvoicebyNO(no):Observable<any>{
  return this.http.get<any>(`${environment.serverUrl}invoices:${no}`).pipe(
    map(x=>{
      return x;
    }),
    catchError(this.handleError)
  )
}
updateInvoice(id, data):Observable<any>{
  return this.http.put<any>(`${environment.serverUrl}invoice/update/invoice?id=${id}`,data).pipe(
    map(x=>{
      return x;
    }),
    catchError(this.handleError)
  )
}
deleteInvoice(id):Observable<any>{ 
  return this.http.delete<any>(`${environment.serverUrl}invoice/delete:${id}`).pipe(
    map(x=>{
      return x;
    }),
    catchError(this.handleError)
  )
}
postInvoice(data):Observable<any>{
  return this.http.post<any>(`${environment.serverUrl}invoice/create`,data).pipe(
    map(x=>{
      return x;
    }),
    catchError(this.handleError)
  )
}
deleteSelectedInvoice(id):Observable<any>{
let data={
  ids:id
}
  return this.http.post(`${environment.serverUrl}invoice/bulkdel`,data).pipe(map(x=>{
    return x
  }),catchError(this.handleError)
  )
}
 
getInvoicePdfbyNo(no):Observable<any>{
  return this.http.get(`${environment.serverUrl}invoice/pdf:${no}`, { responseType: 'text' }).pipe(
    map((x:any)=>{
      console.log(x);
      return x;
     
      
    }),
    catchError(this.handleError)
  )
} 
getInvoiceReadablePDF(no):Observable<any>{
  return this.http.get(`${environment.serverUrl}invoice/get/invoicePdf:${no}`,{responseType:'blob'}).pipe(
    map(x=>{
      return x
    }),catchError(this.handleError)
  )
}
updateStatusAfterPayment(orderid, data) {
  return this.http.put(`${environment.serverUrl}invoice/update/details:${orderid}`, data).pipe(map(x => {
    return x;
  }), catchError(this.handleError))
}
  handleError(httperror?:HttpErrorResponse){
    return throwError(httperror.message || "Error In Message")
  }
}
