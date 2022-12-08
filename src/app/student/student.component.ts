import { Component, OnInit } from '@angular/core';
import {StudentService} from "./student.service";

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  constructor(private readonly studentService: StudentService) { }

  ngOnInit(): void {
    this.getStudents()
  }


  loading: boolean =false
  students: any = []


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

}
