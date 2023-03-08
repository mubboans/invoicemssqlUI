import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvoiceItemService {

  constructor(public http:HttpClient) { }

  getInvoiceItem():Observable<any>{
    return this.http.get<any>(environment.serverUrl + 'invoice_item').pipe(
      map(x=>{
        return x;
      }),
      catchError(this.handleError)
    )
  }
  updateInvoiceItem(id,data){
    return this.http.put<any>(`${environment.serverUrl}invoice_item:${id}`,data).pipe(
      map(x=>{
        return x
      }),
      catchError(this.handleError)
    )
  }

  deleteInvoiceItem(id){
    return this.http.delete<any>(`${environment.serverUrl}invoice_item:${id}`).pipe(
      map(x=>{
        return x
      }),
      catchError(this.handleError)
    )
  }
  postInvoiceItem(data){
    return this.http.post<any>(`${environment.serverUrl}invoice_item`,data).pipe(
      map(x=>{
        return x
      }),
      catchError(this.handleError)
    )
  }
  handleError(httpError?: HttpErrorResponse){
    return Observable.throw(httpError.message || "Server Error")
  }
}
