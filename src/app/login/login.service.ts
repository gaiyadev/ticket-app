import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private readonly http: HttpClient) { }

  submitHandler(form: any) : Observable<any>{
    return this.http.post<any>(`${environment.baseUrl}/users/signin`, form);
  }

  isAuthenticated(): any {
     return localStorage.getItem('accessToken')
  }

  logout(){
  return localStorage.clear()
  }

//   isAdmin(): any{
//     const user: any = localStorage.getItem('appData')
//     console.log(">>>",JSON.parse(user).isAdmin)
//     if(JSON.parse(user).isAdmin != true) {
//       return
//     }
// return true
//   }

}
