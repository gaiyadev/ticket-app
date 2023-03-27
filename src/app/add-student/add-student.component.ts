import { Component, OnInit } from '@angular/core';
import {AddStudentService} from "./add-student.service";
import {ActivatedRoute, Router} from "@angular/router";
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
  // password: string
}

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  constructor(private readonly addStudentService: AddStudentService, private route: ActivatedRoute,
              private router: Router,
              private readonly http: HttpClient) { }

  ngOnInit(): void {
  }

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
    // password: '',
  }

  errorMessage: string = ''
  successMessage: string = ''

  submitHandler(form: User) {
    this.addStudentService.submitHandler(form)
      .subscribe({
        next: (response) => {
          this.loading = false
          this.errorMessage = ''
          // alert('Added successfully')
          this.successMessage = 'Added successfully'
          // this.router.navigate(['/student']);
        },
        error: (error) => {
          this.errorMessage = error.error.message
          console.log(error)
          this.loading = false
        },
        complete: () => {
          this.loading = false
          console.log('Done fetching data')
        }
      });

  }

}
