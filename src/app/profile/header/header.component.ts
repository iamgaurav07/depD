import { Component, OnInit } from '@angular/core';
import { CookieService } from '../../common-services/cookie.service';
import { Router } from '@angular/router';
import { LoginService } from "../services/login.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private cs: CookieService, private router: Router, private ls:LoginService) { }

  userInfoCheck: boolean = false;
  user: any;

  ngOnInit() {
    this.userInfoCheck = this.cs.hasItem("user_id");
    this.getUser();
  }

  logout(){
    window.localStorage.removeItem("token");
    this.cs.deleteAllCookies();
  }

  wayToAnotherComponent(){
      this.router.navigate(["/profile/userprofile"]);    
  }

  getUser(){
    if (this.cs.hasItem("token") && this.cs.hasItem("userId") && this.cs.hasItem("user_id")){

      let object = {
        id : this.cs.getItem("userId"),
        userId: this.cs.getItem("user_id"),
      }
      this.ls.getUserDetail(object).subscribe((res: any)=>{
        if (res.success){
          this.user = res.data
        } else {
          this.cs.logout();
        }
      });
    }
  }

}
