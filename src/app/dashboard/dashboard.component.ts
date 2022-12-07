import { Component, OnInit } from '@angular/core';
import {DashboardService} from "./dashboard.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor( private readonly dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.getBooks()
  }

  loading: boolean =false
  books: any = []


  getBooks(): void{
    this.loading = true
    this.dashboardService.getBooks()
      .subscribe({
        next: (response) => {
          this.loading = false
          this.books = response
          console.log(this.books)
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
