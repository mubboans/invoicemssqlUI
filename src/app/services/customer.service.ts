import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map,catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(public http:HttpClient) { }
  postCustomer(data):Observable<any>{
    return this.http.post<any>(`${environment.serverUrl}customer`,data).pipe(
      map(x=>{
        return x;
      }),catchError(this.handleError)
    )
  }

  getCustomer():Observable<any>{
    return this.http.get<any>(`${environment.serverUrl}customer`).pipe(
      map((x)=>{
        return x;
      }),catchError(this.handleError)
    )
  }

  getCustomerbyId(id):Observable<any>{
    return this.http.get(`${environment.serverUrl}customer:${id}`).pipe(
      map((x)=>{
        return x;
      })
    )
  }

  updateCuctomerbyID(id,data):Observable<any>{
    return this.http.put(`${environment.serverUrl}customer:${id}`,data).pipe(
      map((x)=>{
        return x;
      })
    )
  }

   uploadCustomerCSV(file):Observable<any>{
    return this.http.post<any>(`${environment.serverUrl}customer/multiupload`,file).pipe(
      map(x=>{
        return x;
      }),
      catchError(this.handleError)
    )
   }

  deletCustomerbyId(id):Observable<any>{
    return this.http.delete<any>(`${environment.serverUrl}customer:${id}`).pipe(
      map((x)=>{
        return x
      })
    )
  }
  
  handleError(error?:HttpErrorResponse) {
    return throwError(error.message || "Server Errors")
   
  }
}
