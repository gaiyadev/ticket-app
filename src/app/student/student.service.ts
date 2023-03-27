import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private readonly http: HttpClient) { }

  getStudents() : Observable<any>{
    return this.http.get<any>(`${environment.baseUrl}/students`);
  }

  editStudent(id: number){
    return this.http.get<any>(`${environment.baseUrl}/students/${id}`);
  }

  deleteStudent(id: number){
    return this.http.delete<any>(`${environment.baseUrl}/students/${id}`);
  }
}
