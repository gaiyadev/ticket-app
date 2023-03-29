import { Component, OnInit } from '@angular/core';
import {environment} from "../../environments/environment";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-reciept',
  templateUrl: './reciept.component.html',
  styleUrls: ['./reciept.component.css']
})
export class RecieptComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private readonly http: HttpClient) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id : any=  params.get('id')
      this.recieved( id)
    })
  }

  book: any = {}
  seat_number: any
  amount: any
  uniqueId: any

  recieved(id:number) {
    this.http.get<any>(`${environment.baseUrl}/tickets/${id}`)
      .subscribe({
        next: (response) => {
          console.log(response)
          this.book =response.book
          this.seat_number =response.seat_number
          this.amount =response.amount
          this.uniqueId =response.uniqueId
        },
        error: (error) => {
          console.log('error er', error);
        },
        complete: () => {
          console.log('Done fetching data')
        }
      });
  }
}
