import { Component, OnInit } from '@angular/core';
import {TicketService} from "./ticket.service";
interface User {
  from: string
  to: string
  time: string
  price: string
}
@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  constructor(private readonly ticketService: TicketService) { }

  ngOnInit(): void {
  }
  form: User= {
    from: '',
    to: '',
    time: '',
    price: ''
  }
  loading: boolean = false


  errorMessage: string = ''
  successMessage: string = ''
  submitHandler(form: any){

    this.loading = true
    this.ticketService.submitHandler(form)
      .subscribe({
        next: (response) => {
          this.loading = false
          this.errorMessage = ''
          this.successMessage = 'Added successfully'
        },
        error: (error) => {
          console.log('error er', error.error.message);
          this.errorMessage = error.error.message
          this.successMessage = '';
          this.loading = false
        },
        complete: () => {
          this.loading = false
          console.log('Done fetching data')
        }
      });
  }

}
