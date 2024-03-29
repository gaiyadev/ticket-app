import { Component, OnInit } from '@angular/core';
import {StudentService} from "./student.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  constructor(private readonly studentService: StudentService,
              private router: Router,
              private readonly http: HttpClient
  ) { }

  ngOnInit(): void {
    this.getStudents()
  }


  loading: boolean =false
  students: any = []
  successMessage:string = ''

  // form: any = {
  //   file: ''
  // }
  selectedFile: any
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    this.http.post(`${environment.baseUrl}/users/upload-excel`, formData)
  .subscribe({
    next: (response) => {
      console.log('response>>', response)
      alert('uploaded successfully')
    },
    error: (error) => {
      console.log('error er', error.error.message);
      alert(error.error.message)
    },
    complete: () => {
      this.loading = false
      console.log('Done fetching data')
    }
  });
    // TODO: Send the form data to the server using HttpClient
  }

  getStudents(): void{
    this.loading = true
    this.studentService.getStudents()
      .subscribe({
        next: (response) => {
          this.loading = false
          this.students = response
          console.log(this.students)
        },
        error: (error) => {
          console.log('error er', error);
          this.loading = false
        },
        complete: () => {
          this.loading = false
          console.log('Done fetching data')
        }
      });
  }

  editStudent(id: number){
    this.router.navigate([`student/${id}`]).then(r => console.log('dd'));
  }

  deleteStudent(id: number){
    return this.studentService.deleteStudent(id)
      .subscribe({
        next: (response) => {
          this.successMessage = 'Deleted successfully'
          this.getStudents()
          // this.loading = false
          // this.students = response
          // console.log(this.students)
        },
        error: (error) => {
          console.log('error er', error);
          this.loading = false
        },
        complete: () => {
          this.loading = false
          console.log('Done fetching data')
        }
      });
  }

}
