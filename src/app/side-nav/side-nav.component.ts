import { Component, OnInit } from '@angular/core';
import {LoginService} from "../login/login.service";

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  constructor(private readonly loginService: LoginService) { }
  admin: boolean | undefined
  ngOnInit(): void {
    this.isAdmin()
    this.email()
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
    return  JSON.parse(user).reqNumber
  }
}
