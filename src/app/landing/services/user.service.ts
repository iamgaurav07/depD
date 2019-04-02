import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { JwtHelperService } from "@auth0/angular-jwt";
import { CookieService } from '../../common-services/cookie.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient, private cs: CookieService) { }

  createuser(obj) {
    console.log("working income");
    return this.httpClient.post(environment.baseURL + 'createUser', obj)
  }

  authentication(loginDetails) {
    loginDetails.email = loginDetails.email.toLowerCase();
    return this.httpClient.post(environment.baseURL + 'authenticate', loginDetails)
  }

  saveUpdateUserTokenAndDetails(payload) {
    let token = payload.token;
    let jwtHelper = new JwtHelperService();
    let expirationDate = jwtHelper.getTokenExpirationDate(token);

    if (this.cs.hasItem("token")) {this.cs.removeItem("token", null, null);}
    this.cs.setItem("token", token, expirationDate, "/", null, null);
    localStorage.setItem("token", token);
  }

  isUserLoggedIn() {
    if (
      this.cs.hasItem("token")
    ) {
      let token = this.cs.getItem("token");
      if (!token) return false;
      let jwtHelper = new JwtHelperService();
      let expirationDate = jwtHelper.getTokenExpirationDate(token);
      let isTokExpired = jwtHelper.isTokenExpired(token);
      console.log("token expired", isTokExpired)
      return isTokExpired;
    } else {
      console.log("mandatory fields missing...");
      return false;
    }
  }

  /* saveGotrs(title){
    return this.httpClient.post(environment.baseURL + 'saveTitle', {title: title})
  } */

  getKambojTitles(){
    return this.httpClient.post(environment.baseURL + 'getTitles', {})
  }
}
