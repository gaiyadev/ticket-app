import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(private readonly http: HttpClient) { }

  submitHandler(form: any, userId: number) : Observable<any>{
    console.log('form>>>', form, userId)
    return this.http.post<any>(`${environment.baseUrl}/wallets/add-fund/${userId}`, form);

  }

  getWallet(id: number) : Observable<any>{
    return this.http.get<any>(`${environment.baseUrl}/wallets/${id}`);

  }

}
