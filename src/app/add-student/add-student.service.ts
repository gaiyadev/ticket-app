import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AddStudentService {

  constructor(private readonly http: HttpClient) { }

  submitHandler(form: any) {
    return this.http.post<any>(`${environment.baseUrl}/students`, form);
  }
}
