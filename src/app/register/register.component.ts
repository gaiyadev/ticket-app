import { Component, OnInit } from '@angular/core';
import {RegisterService} from "./register.service";
import {ActivatedRoute, Router} from "@angular/router";

interface User {
  regNumber: string
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent implements OnInit {

  constructor(
    private readonly registerService: RegisterService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  loading: boolean = false

  form: User  = {
    regNumber: ''
  }
errorMessage: string = ''

  submitHandler(form: any): void{
    this.loading = true
     this.registerService.submitHandler(form)
      .subscribe({
        next: (response) => {
          this.loading = false
          const id = response.id
          if(response.reqNumber) {
            this.router.navigate([`registration/${id}`]);
          }
        },
        error: (error) => {
          console.log('error er', error);
          this.errorMessage = error.error.message
          this.loading = false
        },
        complete: () => {
          this.loading = false
          console.log('Done fetching data')
        }
      });
  }

  ngOnInit(): void {
  }

}
