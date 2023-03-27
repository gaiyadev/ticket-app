import { Component, OnInit } from '@angular/core';
import {CompleteRegistrationService} from "./complete-registration.service";
import {RegisterService} from "../register/register.service";
import {switchMap} from "rxjs";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
interface User {
  firstName: string,
  lastName: string,
  email: string,
  reqNumber:string,
  department: string,
  course: string,
  level: string,
  faculty: string,
  password: string
}
@Component({
  selector: 'app-complete-registration',
  templateUrl: './complete-registration.component.html',
  styleUrls: ['./complete-registration.component.css']
})
export class CompleteRegistrationComponent implements OnInit {

  constructor(private readonly completeRegistrationService: CompleteRegistrationService ,
              private readonly registerService:RegisterService,
              private route: ActivatedRoute,
              private router: Router,
              private readonly http: HttpClient

  ) { }
  loading: boolean = false
form: User = {
  firstName: '',
  lastName: '',
  email:'',
  reqNumber:'',
  department:'',
  course: '',
  level: '',
  faculty: '',
  password: '',
  }

  errorMessage: string = ''
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id : any=  params.get('id')
      this.fetchUser( id)
    })
  }

  // form: {} = {}
  fetchUser(id: any): void {
    this.loading = true
     this.http.get<any>(`${environment.baseUrl}/students/user/${id}`).subscribe({
      next: (response) => {
        this.form = response
        this.loading = false
      },
      error: (error) => {
        console.log(error);
        this.loading = false
      },
      complete: () => {
        this.loading = false
        console.log('Done fetching data')
      }
    });
  }
//
submitHandler(form: User) {
     this.completeRegistrationService.submitHandler(form)
      .subscribe({
        next: (response) => {
          this.loading = false
          console.log("response")
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.log(error)
          this.errorMessage = error.error.message
          this.loading = false
        },
        complete: () => {
          this.loading = false
          console.log('Done fetching data')
        }
      });

}
}
