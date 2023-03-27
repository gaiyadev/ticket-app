import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EditServiceService {

  constructor(private readonly http: HttpClient) { }
  submitHandler(form: any, id: number) {
    return this.http.patch<any>(`${environment.baseUrl}/students/${id}`, form);
  }

  getStudent(id: number) {
    return this.http.get<any>(`${environment.baseUrl}/students/user/${id}`);
  }
}
