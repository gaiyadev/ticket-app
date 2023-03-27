import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {EditServiceService} from "./edit-service.service";
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
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {

  constructor(private readonly editServiceService: EditServiceService, private route: ActivatedRoute,
              private router: Router,
              private readonly http: HttpClient) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id : any=  params.get('id')
      this.getStudent( id)
    })
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
id: any = ''
  submitHandler(form: User) {
    this.editServiceService.submitHandler(form, this.id)
      .subscribe({
        next: (response) => {
          this.loading = false
          this.errorMessage = ''
          // alert('Added successfully')
          this.successMessage = 'Updated successfully'
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

  getStudent(id: number) {
return this.editServiceService.getStudent(id)
  .subscribe({
  next: (response) => {
    this.loading = false
    this.errorMessage = ''
    console.log(response)
this.form.email= response.email
this.form.lastName= response.lastName
this.form.firstName= response.firstName
this.form.reqNumber= response.reqNumber
this.form.level= response.level
this.form.faculty= response.faculty
this.form.course = response.course
this.form.department = response.department
this.id = response.id
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
