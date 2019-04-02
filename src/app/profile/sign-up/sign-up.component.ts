import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router"; // for internal routing

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  joinUs: any = 'step1';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  saveBasicInformation(){
    this.joinUs = 'step2';
  }

  saveAddressDetails(){
    this.joinUs = 'step3';
  }

  saveQualificationDetails(){
    this.joinUs = 'step4';
  }

  dietHightCheck(){
    this.joinUs = 'step5';
  }

  almostDoneDetail(){
    this.router.navigate(["/profile/findmatch"])
    this.joinUs = 'step1';
  }

}
