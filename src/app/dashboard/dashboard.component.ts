import { Component, OnInit } from '@angular/core';
import {DashboardService} from "./dashboard.service";
import {LoginService} from "../login/login.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private readonly dashboardService: DashboardService,
    private readonly loginService:LoginService
  )
  { }

  ngOnInit(): void {
    this.getBooks()
    this.studentsCount()
    this.totalTickets()
    this.activeUser()
  }

  loading: boolean =false
  books: any = []
students: any = ''
activeUsers: any = ''
tickets: any = ''

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

  studentsCount(): void{
    this.loading = true
    this.dashboardService.studentsCount()
      .subscribe({
        next: (response) => {
          this.loading = false
          this.students = response[1]
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

  activeUser(): void{
    this.loading = true
    this.dashboardService.activeUser()
      .subscribe({
        next: (response) => {
          this.loading = false
          this.activeUsers = response[1]
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


  totalTickets(): void{
    this.loading = true
    this.dashboardService.totalTickets()
      .subscribe({
        next: (response) => {
          this.loading = false
          this.tickets = response.length
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
