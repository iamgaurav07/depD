import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { CookieService } from '../../common-services/cookie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  partners: any;
  loader: boolean = true;

  constructor(private ls: LoginService, private cs: CookieService, private router: Router) { }

  ngOnInit() {
    if (this.cs.hasItem("userId") && this.cs.hasItem("user_id") && this.cs.hasItem("token") && this.cs.hasItem("gender")) {
      this.getPatnerListing();
    } else {
      this.cs.logout()
    }

  }

  getPatnerListing() {
    let object = {
      id: this.cs.getItem("userId"),
      userId: this.cs.getItem("user_id"),
      gender: this.cs.getItem("gender"),
    }

    this.ls.getPatnerListing(object).subscribe((res: any) => {
      if (res.success) {
        this.partners = res.data;
        this.loader = false;
      } else {
        console.log("data not found");
      }
    })
  }

  toUpgrade(){
    console.log("working");
    this.router.navigate(["profile/upgradeaccount"])
  }

}
