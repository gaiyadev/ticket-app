import { Component, OnInit } from '@angular/core';
import {TicketService} from "../ticket/ticket.service";
import {TicketsService} from "./tickets.service";
import {DashboardService} from "../dashboard/dashboard.service";
import {LoginService} from "../login/login.service";
import {Router} from "@angular/router";
interface User {
  from: string
  to: string
  time: string
  price: string
}
@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
  constructor(
    private readonly dashboardService: DashboardService,
    private readonly loginService:LoginService,
    private readonly ticketsService: TicketsService,
    private router: Router,
  )
  { }

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
  getBooks(): void{
    this.loading = true
    this.dashboardService.getBooks()
      .subscribe({
        next: (response) => {
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

  logout(){
    return this.loginService.logout()
  }

  deleteTicket(id: number) {
    return this.ticketsService.deleteTicket(id)
      .subscribe({
      next: (response) => {
        this.loading = false
        this.successMessage = "Deleted successfully"
        this.getBooks()
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
  editTicket(id: number){
    this.router.navigate([`tickets/${id}`]).then(r => console.log('dd'));
  }
}
