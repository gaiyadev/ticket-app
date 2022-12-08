import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import {LoginService} from "../login/login.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private readonly loginService: LoginService,   private route: ActivatedRoute,
              private router: Router ) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const accessToken =  this.loginService.isAuthenticated()
    if(accessToken === null || accessToken === undefined) {
      return this.router.navigate([`login`]);

    }
    return true
  }

}
