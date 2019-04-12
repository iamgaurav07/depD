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

  duplicateEmail = false;

  signupEmailError: any;
  signupPassError: any;
  genderError: any;
  profileforError: any;

  loginEmailError: any;
  loginPassError: any;
  emailPasswordCheck: boolean = false;

  ngOnInit() {
    this.getTitle();
    this.initSignUpForm();
  }

  initSignUpForm() {
    this.signUpForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      gender: ['', Validators.required],
      profileFor: ['', Validators.required]
    })

    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  getTitle() {
    this.us.getKambojTitles().subscribe((res: any) => {
      if (res.success) {
        this.titles = res.message;
      } else {
        console.log("something went wrong")
      }
    })
  }

  createAccount() {

    this.signupEmailError = this.signUpForm.controls.email.invalid;
    this.signupPassError = this.signUpForm.controls.password.invalid;
    this.genderError = this.signUpForm.controls.gender.invalid;
    this.profileforError = this.signUpForm.controls.profileFor.invalid;

    if (!this.signupEmailError && !this.signupPassError && !this.genderError && !this.profileforError) {
      let obj = {
        email: this.signUpForm.value.email,
        password: this.signUpForm.value.password,
        gender: this.signUpForm.value.gender,
        profileFor: this.signUpForm.value.profileFor
      }

      this.us.createuser(obj).subscribe((res: any) => {
        if (res.success) {
          localStorage.setItem('email', this.signUpForm.controls.email.value);
          this.duplicateEmail = false;
          $('#exampleModalCenter').modal('hide');
          $('#loginModal').modal('show');
        } else {
          if (res.code == 102) {
            this.duplicateEmail = true;
          }
          console.log("something went wrong");
        }
      })
    }


  }

  authenticate() {

    this.loginEmailError = this.loginForm.controls.email.invalid;
    this.loginPassError = this.loginForm.controls.email.invalid;

    if (!this.loginEmailError && !this.loginPassError) {

      let bodyObj = this.loginForm.value

      this.us.authentication(bodyObj).subscribe((res: any) => {
        if (res.success) {
          console.log(res);
          this.us.saveUpdateUserTokenAndDetails(res);
          this.emailPasswordCheck = false;
          $('#loginModal').modal('hide'); $('#loginModal').modal('hide');

          if (res.user_id) {
            this.router.navigate(["/profile/findmatch"]);
          } else {
            this.router.navigate(["/profile/signup"]);
          }

        } else {
          if (res.code == 111 || res.code == 112){
            this.emailPasswordCheck = true;
            console.log("email or email not match")
            this.cs.deleteAllCookies();
          } 
        }
      })

    } else {
      console.log("fill the form");
    }
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
