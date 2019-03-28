import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  selectedYear:  any;
  joinUs: any = 'step1'

  ngOnInit() {
  }

  registerModal(){
    console.log("working");
  }

  createAccount(){
    this.joinUs = 'step2';
    console.log("profile created");
  }

  saveBasicInformation(){
    this.joinUs = 'step3';
    console.log("Basic information saved");
  }

  saveQualificationDetails(){
    this.joinUs = 'step4';
    console.log("Qualification Details saved");
  }

  dietHightCheck(){
    this.joinUs = 'step5';
    console.log("diet height");
  }

  almostDoneDetail(){
    this.joinUs = 'step1';
  }

  authenticate(){
    this.joinUs = 'step1';
  }
}
