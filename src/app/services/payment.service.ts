import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(public http:HttpClient) { }
  updateStatus(id,data):Observable<any>{
    return this.http.patch(`${environment.serverUrl}invoice/payment/update:${id}`,data).pipe(
      map(x=>{
        return x;
      }),catchError(this.handleError)
    )
  }
  getPaymentStatus(id):Observable<any>{
    return this.http.get<any>(`${environment.serverUrl}invoice/payment/status:${id}`).pipe(
      map(x=>{
        return x;
      }),catchError(this.handleError)
    )
  }
  handleError(error : HttpErrorResponse){
    return throwError(error.message || 'Server Error')
  }
}
