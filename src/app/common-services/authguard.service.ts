import { Injectable } from '@angular/core';
import { UserService } from '../landing/services/user.service';
import { CookieService } from './cookie.service';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {

  constructor(private cs: CookieService, private us: UserService, private router: Router) { }

  canActivate(route, state: RouterStateSnapshot){
    if (this.cs.getItem("token") == window.localStorage.getItem("token") && this.us.isUserLoggedIn()){
      return true
    } else {
      return false
    }
  
  }

}
