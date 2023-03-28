import { Component, OnInit } from '@angular/core';
import {BookTicketService} from "./book-ticket.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import * as fs from "fs";

@Component({
  selector: 'app-book-ticket',
  templateUrl: './book-ticket.component.html',
  styleUrls: ['./book-ticket.component.css']
})
export class BookTicketComponent implements OnInit {

  constructor(private readonly bookTicketService: BookTicketService,  private route: ActivatedRoute,
              private router: Router,) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id : any=  params.get('id')
      this.fetchTicket( id)
    })
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
  payWithCard(id:number) {
   return this.bookTicketService.payWithCard(id)
  }
  payWithWallet(id: number) {
    return this.bookTicketService.payWithWallet(id)


  }

}
