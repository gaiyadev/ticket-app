import { Component, OnInit } from '@angular/core';
import {StudentService} from "./student.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  constructor(private readonly studentService: StudentService,
              private router: Router,
  ) { }

  ngOnInit(): void {
    this.getStudents()
  }


  loading: boolean =false
  students: any = []
  successMessage:string = ''

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
