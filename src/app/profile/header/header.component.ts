import { Component, OnInit } from '@angular/core';
import { CookieService } from '../../common-services/cookie.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private cs: CookieService) { }

  ngOnInit() {
  }

  logout(){
    window.localStorage.removeItem("token");
    this.cs.deleteAllCookies();
  }

}
