import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private readonly http: HttpClient) { }

  submitHandler(form: any) : Observable<any>{
    return this.http.post<any>(`${environment.baseUrl}/books`, form);
  }

}
