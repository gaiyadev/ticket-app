import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class CompleteRegistrationService {

  constructor(private readonly http: HttpClient) { }

  submitHandler(form: any) {
    return this.http.post<any>(`${environment.baseUrl}/users/signup`, form);
  }
}
