import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {WalletComponent} from "../wallet/wallet.component";
import {WalletService} from "../wallet/wallet.service";

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  userId: any
  walletId: any = ''

  constructor( private route: ActivatedRoute,
                private readonly http: HttpClient) { }

  ngOnInit(): void {
    this.getUserId()
    this.getWallet()
    // this.getTransactions()
  }

  getUserId() {
    const user: any = localStorage.getItem('appData')
    return this.userId = JSON.parse(user).id
  }

  getWallet() {
     this.http.get<any>(`${environment.baseUrl}/wallets/${this.userId}`)
      .subscribe({
        next: (response) => {
          this.walletId = response.id
          this.getTransactions( response.id)
          // console.log('response', this.walletId)
        },
        error: (error) => {
          console.log('error er', error.error.message);
        },
        complete: () => {
          console.log('Done fetching data')
        }
      });

  }

  transactions: any
getTransactions(id: any) {
  console.log('response')
  this.http.get(`${environment.baseUrl}/wallets/transactions/${id}`)
    .subscribe({
      next: (response) => {
        console.log(response)
        this.transactions = response
        // this.loading = false
        // this.errorMessage = ''
        // alert('Added successfully')
        // this.successMessage = 'Updated successfully'
        // this.router.navigate(['/student']);
      },
      error: (error) => {
        // this.errorMessage = error.error.message
        // console.log(error)
        // this.loading = false
      },
      complete: () => {
        // this.loading = false
        console.log('Done fetching data')
      }
    });
}

}
