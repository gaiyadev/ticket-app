import { Component, OnInit } from '@angular/core';
import {LoginService} from "./login.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
interface User {
  regNumber: string
  password: string
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private readonly loginService: LoginService,  private route: ActivatedRoute,
              private router: Router,
              private readonly http: HttpClient) { }

  ngOnInit(): void {
  }

  form: User= {
    regNumber: '',
    password: ''
}
  loading: boolean = false


  errorMessage: string = ''
  submitHandler(form: any){

    this.loading = true
    this.loginService.submitHandler(form)
      .subscribe({
        next: (response) => {
          this.loading = false
          localStorage.setItem('accessToken', response.accessToken)
          localStorage.setItem('appData', JSON.stringify(response.data))
          if(response.accessToken) {
            this.router.navigate([`dashboard`]);
          }
        },
        error: (error) => {
          console.log('error er', error.error.message);
          this.errorMessage = error.error.message
          this.loading = false
        },
        complete: () => {
          this.loading = false
          console.log('Done fetching data')
        }
      });
  }


  logout(){
    return this.loginService.logout()
  }
}
