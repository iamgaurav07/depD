import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute, Params } from "@angular/router"; // for internal routing
import { CookieService } from '../../common-services/cookie.service';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private fb: FormBuilder, private us: UserService, private router: Router, private cs: CookieService) {

  }

  selectedYear: any;
  signUpForm: FormGroup;
  loginForm: FormGroup;
  titles: any;

  ngOnInit() {
    this.getTitle();
    this.initSignUpForm();
  }

  initSignUpForm() {
    this.signUpForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      gender: [Validators.required],
      profileFor: [Validators.required]
    })

    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  getTitle(){
    this.us.getKambojTitles().subscribe((res: any) => {
      if (res.success) {
        this.titles = res.message;
      } else {
        console.log("something went wrong")
      }
    })
  }

  createAccount() {
    let obj = {
      email: this.signUpForm.controls.email.value,
      password: this.signUpForm.controls.password.value,
      gender: this.signUpForm.controls.gender.value,
      profileFor: this.signUpForm.controls.profileFor.value,
    }
    this.us.createuser(obj).subscribe((res: any) => {
      if (res.success) {
        localStorage.setItem('email', this.signUpForm.controls.email.value);
        $('#exampleModalCenter').modal('hide');
        $('#loginModal').modal('show');
      } else {
        console.log("something went wrong");
      }
    })

  }

  authenticate() {
    $('#loginModal').modal('hide');

    let bodyObj = this.loginForm.value

    this.us.authentication(bodyObj).subscribe((res: any) => {
      if (res.success) {
        this.us.saveUpdateUserTokenAndDetails(res);
        this.router.navigate(["/profile/signup"])
      } else {
        this.cs.deleteAllCookies();
      }
    })
  }

  /* async saveTitleP() {

    let array = ["Abdal","Ajapal", "Angiarey","Asoi","Bahujad","Bajye","Bage",
      "Barar","Bhatti","Basra","Chak","Chandi","Chand","Chatrath","Daberah",
      "Dhanju","Dhot","Dote","Dulai","Handa","Jaiya","Jammu","Jakhpal","Jatmal",
      "Josan","Jaura","Judge","Karhi","Khere","Kausle","Karanpal","Kaura","Kayar",
      "Khinda","Kirgil","Laure","Mardak","Mehrok","Momi","Mutti","Nandha","Nagpal",
      "Nagra","Nandan","Nibber","Pandhu","Patanrai","Pran","Ratanpal",
      "Sama","Sandha","Sandher","Sandheer","Sawan","Soi","Shahi","Suner",
      "Tandne","Trikhe","Thind","Tume","Turna","Vinayak","Pathan","Unmal","Bhaun"]

    for (let index = 0; index < array.length; index++) {

      let value = array[index];

      this.us.saveGotrs(value).subscribe((res: any) => {
        if (res.success) {
          console.log("res", res);
        } else {
          console.log("something went wrong", res);
        }
      })

    }
  } */
}
