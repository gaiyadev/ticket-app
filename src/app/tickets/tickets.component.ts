import { Component, OnInit } from '@angular/core';
import {TicketService} from "../ticket/ticket.service";
import {TicketsService} from "./tickets.service";
import {DashboardService} from "../dashboard/dashboard.service";
import {LoginService} from "../login/login.service";
interface User {
  from: string
  to: string
  time: string
}
@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
  constructor(
    private readonly dashboardService: DashboardService,
    private readonly loginService:LoginService
  )
  { }

  ngOnInit(): void {
    this.getBooks()
  }

  loading: boolean =false
  books: any = []

  isAdmin(): any{
    const user: any = localStorage.getItem('appData')
    return  JSON.parse(user).isAdmin
  }
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

  logout(){
    return this.loginService.logout()
  }
}
