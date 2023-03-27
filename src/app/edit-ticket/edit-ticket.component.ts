import { Component, OnInit } from '@angular/core';
import {EditTicketService} from "./edit-ticket.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

interface User {
  from: string
  to: string
  time: string
  price: string
}
@Component({
  selector: 'app-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.css']
})
export class EditTicketComponent implements OnInit {

  constructor(private readonly editTicketService: EditTicketService,   private route: ActivatedRoute,
              private router: Router,
              private readonly http: HttpClient) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id : any=  params.get('id')
      this.fetchTicket( id)
    })
  }
  loading: boolean = false
// book = {}
  form: User= {
    from: '',
    to: '',
    time: '',
    price: ''
  }
  errorMessage: string = ''
  successMessage: string = ''
  ticketId: any = ''

  fetchTicket(id: number) {
    this.editTicketService.fetchTicket(id)
      .subscribe({
        next: (response) => {
          this.loading = false
          this.form.from = response.from
          this.form.to = response.to
          this.form.time = response.time
          this.form.price = response.price
          this.ticketId = response.id
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

  submitHandler(form: any){
    this.loading = true
    this.editTicketService.submitHandler(form, this.ticketId)
      .subscribe({
        next: (response) => {
          this.loading = false
          this.errorMessage = ''
          this.successMessage = 'Updated successfully'
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
  }}
