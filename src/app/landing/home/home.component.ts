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

  ngOnInit() {
    $(document).ready(function(){
      $('.modal').modal();
    });
  }

  registerModal(){
    console.log("working");
  }
}
