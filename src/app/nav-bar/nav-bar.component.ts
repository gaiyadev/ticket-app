import { Component, OnInit } from '@angular/core';
import {LoginService} from "../login/login.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private readonly loginService: LoginService) { }
  admin: boolean | undefined

  ngOnInit(): void {
   this.isAdmin()
    this.email()
    console.log(this.isAdmin())
  }

  logout(){
    return this.loginService.logout()
  }

  isAuthenticated() {
    return this.loginService.isAuthenticated()
  }


  isAdmin(): any{
    const user: any = localStorage.getItem('appData')
    return  JSON.parse(user).isAdmin
  }

  email(): any{
    const user: any = localStorage.getItem('appData')
    return  JSON.parse(user).email
  }

}
