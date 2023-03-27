import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EditTicketService {


  constructor(private readonly http: HttpClient) { }

  fetchTicket(id: number) : Observable<any>{
    return this.http.get<any>(`${environment.baseUrl}/books/${id}`);
  }
  submitHandler(form: any, id: number) : Observable<any>{
    console.log(id)
    return this.http.patch<any>(`${environment.baseUrl}/books/${id}`, form);
  }
}
