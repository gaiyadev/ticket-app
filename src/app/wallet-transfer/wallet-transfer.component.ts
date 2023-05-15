import { Component, OnInit } from '@angular/core';
import {environment} from "../../environments/environment";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-wallet-transfer',
  templateUrl: './wallet-transfer.component.html',
  styleUrls: ['./wallet-transfer.component.css']
})
export class WalletTransferComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private readonly http: HttpClient) { }

  ngOnInit(): void {
    this.getUserId()
  }
form = {
    amount: '',
    accountId:'',
  userId: 'any'

}
  loading:boolean =false
  errorMessage: string= ''
  successMessage: string= ''

  getUserId() {
    const user: any = localStorage.getItem('appData')
    return this.form.userId = JSON.parse(user).id
  }

  walletTransfer(){
    console.log(this.form)
    this.http.post(`${environment.baseUrl}/wallets/wallet-transfer`, this.form)
      .subscribe({
        next: (response) => {
          console.log('response')
          this.loading = false
          this.errorMessage = ''
          this.successMessage = 'Sent successfully'
          // this.router.navigate(['/student']);
        },
        error: (error) => {
          this.errorMessage = error.error.message
          console.log(error)
          this.loading = false
        },
        complete: () => {
          this.loading = false
          console.log('Done fetching data')
        }
      });
  }

}
