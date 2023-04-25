import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-all-bookings',
  templateUrl: './all-bookings.component.html',
  styleUrls: ['./all-bookings.component.css']
})
export class AllBookingsComponent implements OnInit {


  constructor(private readonly http: HttpClient,     private router: Router,
  ) { }

  ngOnInit(): void {
    this.getBooks()
  }

  loading: boolean =false
  books: any = []
  successMessage: string = ''

  isAdmin(): any{
    const user: any = localStorage.getItem('appData')
    return  JSON.parse(user).isAdmin
  }
  userId: any
  getUserId() {
    const user: any = localStorage.getItem('appData')
    return this.userId = JSON.parse(user).id

  }

  getBooks(): void{
    this.loading = true
    this.http.get<any>(`${environment.baseUrl}/tickets/books`)
      .subscribe({
        next: (response) => {
          console.log(response)
          this.loading = false
          this.books = response
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
  // viewTicket(id: number){
  //   this.router.navigate([`receipt/${id}`]).then(r => console.log('dd'));
  // }
}
