import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { CookieService } from '../../common-services/cookie.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userData: any;

  constructor(private ls: LoginService, private cs: CookieService) {
   }

  ngOnInit() {
    if (this.cs.hasItem("userId") && this.cs.hasItem("user_id") && this.cs.hasItem("token")){
      this.getUserProfileDetails()
    } else {
      this.cs.logout();
    }
  }

  getUserProfileDetails(){
    console.log('user profile');
    let object = {
      id: this.cs.getItem('userId'),
      user_id: this.cs.getItem('user_id')
    }

    this.ls.getUserProfileDetails(object).subscribe((res: any)=>{
      if (res.success){
        console.log(res)
        this.userData = res.data;
      } else {
        console.log("something went wrong");
      }
    })
  }

}
