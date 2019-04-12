import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service'
import { environment } from '../../../environments/environment';
import { CookieService } from '../../common-services/cookie.service'; 

declare var $: any;

@Component({
  selector: 'app-upgrade-account',
  templateUrl: './upgrade-account.component.html',
  styleUrls: ['./upgrade-account.component.css']
})
export class UpgradeAccountComponent implements OnInit {

  constructor(private ls: LoginService, private cs: CookieService) { }

  ngOnInit() {
  }

  makepayment(){
    location.href = environment.baseURL+'makepayment/'+this.cs.getItem("user_id");
  }

}
