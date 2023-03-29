import { Component, OnInit } from '@angular/core';
import {BookTicketService} from "./book-ticket.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import * as fs from "fs";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-book-ticket',
  templateUrl: './book-ticket.component.html',
  styleUrls: ['./book-ticket.component.css']
})
export class BookTicketComponent implements OnInit {

  constructor(private readonly bookTicketService: BookTicketService,  private route: ActivatedRoute,
              private router: Router, private readonly http: HttpClient) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id : any=  params.get('id')
      this.fetchTicket( id)
    })
    this.getUserId()
  }
  book: any = {}
  seat_number: any = 1;
  loading: boolean= false
  errorMessage: string = ''
  successMessage: string = ''

  async fetchTicket(id: number) {
    return this.bookTicketService.fetchTicket(id)
      .subscribe({
        next: (response) => {
          this.book = response
        },
        error: (error) => {
          console.log('error er', error);
        },
        complete: () => {
          console.log('Done fetching data')
        }
      });
  }
  userId: any
  getUserId() {
    const user: any = localStorage.getItem('appData')
    return this.userId = JSON.parse(user).id

  }

  // loading: boolean = false
  payWithCard(id:number) {
    this.loading =true
     this.http.post<any>(`${environment.baseUrl}/tickets/`,{
       bookId: id,
       userId: this.userId,
       amount: Number(this.book.price) * Number(this.seat_number),
       seatNumber: this.seat_number
     })
       .subscribe({
         next: (response) => {
           this.loading =false
           console.log(response)
           this.router.navigate([`receipt/${response.id}`]);
         },
         error: (error) => {
           console.log('error er', error);
           this.errorMessage = error.error.message
           this.loading =false
         },
         complete: () => {
           this.loading =false
           console.log('Done fetching data')
         }
       });
  }
  payWithWallet(id: number) {
    return this.bookTicketService.payWithWallet(id)


  }

}
