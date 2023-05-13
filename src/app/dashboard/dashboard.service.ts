import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private readonly http: HttpClient) { }


  getBooks() : Observable<any>{
    return this.http.get<any>(`${environment.baseUrl}/books`);
  }

  studentsCount() : Observable<any>{
    return this.http.get<any>(`${environment.baseUrl}/students/counts`);
  }

  activeUser() : Observable<any>{
    return this.http.get<any>(`${environment.baseUrl}/users/active/counts`);
  }

  totalTickets() : Observable<any>{
    return this.http.get<any>(`${environment.baseUrl}/books/`);
  }

  getWallet(id: number) : Observable<any>{
    return this.http.get<any>(`${environment.baseUrl}/wallets/${id}`);

  }

  getStats(id: number) : Observable<any>{
    console.log(id, 'ddd')
    return this.http.get<any>(`${environment.baseUrl}/tickets/app-stats/${id}`);

  }
}
