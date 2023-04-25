import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {WalletService} from "./wallet.service";
import {environment} from "../../environments/environment";
interface User {
  amount: string
}
@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  reference = '';

  constructor(private readonly walletService: WalletService, private route: ActivatedRoute,
              private router: Router,
              private readonly http: HttpClient) {
  }

  ngOnInit(): void {
    this.getUserId()
    this.getWallet()
    this.reference = `ref-${Math.ceil(Math.random() * 10e13)}`;
  }

  loading: boolean = false
  form: User | any = {
    amount: '',
  }
  errorMessage: string = ''
  userId: any
  walletBalance: any = 0;
  walletId: any = ''
  userData: any= {
    email:  ''
  }
accessToken: any = ''
  submitHandler(form: any) {
    this.loading = true
    this.walletService.submitHandler(form, this.userId)
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


  getUserId() {
    const user: any = localStorage.getItem('appData')
    this.userData.email = JSON.parse(user).email
    this.accessToken = localStorage.getItem('accessToken')
    return this.userId = JSON.parse(user).id
  }

  getWallet() {
    this.loading = true
    this.walletService.getWallet(this.userId)
      .subscribe({
        next: (response) => {
          this.walletBalance = response.balance
          this.walletId = response.walletId
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

  payWithPaystack(){
    const id =this.userId
    const amount =this.form.amount
    // @ts-ignore
    const handler = PaystackPop.setup({
      key: `${environment.paystack}`,
      email: this.userData.email,
      amount: this.form.amount * 100,
      onClose(){
        alert('Window closed.');
      },
      callback(response:any){
        fetch(`${environment.baseUrl}/wallets/add-fund/${id}/${amount}`).then(()=>{
          location.reload()
          // this.getWallet()
        })
      }
    });
    handler.openIframe()
  }


  addFund(){
    return this.walletService.submitHandler(this.form, this.userId)
  }

}
