import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BookTicketService {

  constructor(private readonly http: HttpClient) { }

  fetchTicket(id: number) : Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/books/${id}`);
  }
  payWithCard(id:number) {
    console.log('payWithCard',id)
  }
  payWithWallet(id: number) {
    console.log('payWithWallet',id)
  }
}
