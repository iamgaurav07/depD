import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { JwtHelperService } from "@auth0/angular-jwt";
import { CookieService } from '../../common-services/cookie.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient, private cs: CookieService) { 
  }

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
    if (this.cs.hasItem("token")) {this.cs.removeItem("token", null, null);}
    if (this.cs.hasItem("user_id") || payload.user_id) {this.cs.removeItem("user_id", null, null);}
    if (payload.user_id) {this.cs.setItem("user_id", payload.user_id, 24*3600 , "/", null, null);}
    if (this.cs.hasItem("gender")) {this.cs.removeItem("gender", null, null)}
    this.cs.setItem("token", token, 24*3600 , "/", null, null);
    this.cs.setItem("userId", payload.userid, 24*3600 , "/", null, null);
    this.cs.setItem("gender", payload.gender, 24*3600 , "/", null, null);
    localStorage.setItem("token", token);
  }

  isUserLoggedIn() {
    if (
      this.cs.hasItem("token") && this.cs.hasItem("userId")
    ) {
      return true
      
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
