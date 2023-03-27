import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  constructor(private readonly http: HttpClient) { }

  submitHandler(form: any) : Observable<any>{
    return this.http.post<any>(`${environment.baseUrl}/books`, form);
  }

  deleteTicket(id: number) : Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}/books/${id}`);
  }
}
