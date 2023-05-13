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
    // this.getUserId()
    this.reference = `ref-${Math.ceil(Math.random() * 10e13)}`;
  }
  book: any = {}
  seat_number: any = 1;
  loading: boolean= false
  errorMessage: string = ''
  successMessage: string = ''
  reference: string = ''
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
    this.userData.email = JSON.parse(user).email
    // this.accessToken = localStorage.getItem('accessToken')
    return this.userId = JSON.parse(user).id
  }
  // getUserId() {
  //   const user: any = localStorage.getItem('appData')
  //    this.userId = JSON.parse(user).id
  //   this.userData.email = JSON.parse(user).email
  //
  // }

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
  form:  any = {
    amount: '',
  }
  walletBalance: any = 0;
  walletId: any = ''
  userData: any= {
    email:  ''
  }
  payWithWallet(bookId: number) {
    const id =this.userId
    const amount =this.form.amount
    // @ts-ignore
    const data = {bookId: this.book.id, userId: this.userId, amount: (Number(this.book.price) * Number(this.seat_number)), seatNumber: this.seat_number}
    // @ts-ignore
    const handler = PaystackPop.setup({
      key: `${environment.paystack}`,
      email: this.userData.email,
      amount: (Number(this.book.price) * Number(this.seat_number)) * 100,
      onClose(){
        alert('Window closed.');
      },
      callback(response:any){
        fetch(`${environment.baseUrl}/tickets/pay/with-card/${JSON.stringify(data)}`, {
        })
          .then(response => response.json())
          .then(data => {
            console.log(data)
              window.open(`receipt/${data.id}`)
          })
          .catch(error => console.error(error));
       }
    });
    handler.openIframe()
    // return this.bookTicketService.payWithWallet(id)


  }

}
