import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {WalletService} from "./wallet.service";
interface User {
  amount: string
}
@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  constructor(private readonly walletService: WalletService,  private route: ActivatedRoute,
              private router: Router,
              private readonly http: HttpClient) { }

  ngOnInit(): void {
    this.getUserId()
    this.getWallet()
  }
  loading: boolean = false
  form: User= {
    amount: '',
  }

  errorMessage: string = ''
  userId: any
  walletBalance: any = 0;

  submitHandler(form: any){
    this.loading = true
    this.walletService.submitHandler(form)
      .subscribe({
        next: (response) => {
          this.loading = false
        },
        error: (error) => {
          console.log('error er', error.error.message);
          this.errorMessage = error.error.message
          this.loading = false
        },
        complete: () => {
          this.loading = false
          console.log('Done fetching data')
        }
      });
  }


  getUserId(){
   const  user: any= localStorage.getItem('appData')
    return this.userId = JSON.parse(user).id

  }

  getWallet(){
    console.log('>>>.', this.userId)
    this.loading = true
    this.walletService.getWallet(this.userId)
      .subscribe({
        next: (response) => {
          this.walletBalance =  response.balance
          this.loading = false
        },
        error: (error) => {
          console.log('error er', error.error.message);
          this.errorMessage = error.error.message
          this.loading = false
        },
        complete: () => {
          this.loading = false
          console.log('Done fetching data')
        }
      });
  }

}
