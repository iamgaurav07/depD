import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router"; // for internal routing
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';

import { CookieService } from '../../common-services/cookie.service';

declare var $: any;

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  joinUs: any = 'step1';
  basicDetail: FormGroup;
  addressDetail: FormGroup;
  qualificationAndWorkingDetails: FormGroup;
  dietHightUpdate: FormGroup;
  aboutUser: FormGroup;

  titles: any;

  nameError: any;
  titleError: any;
  dateOfBirthError: any;
  mobileError: any;

  addressError: any;
  cityError: any;
  stateError: any;
  pincodeError: any;
  userInfoId: any;

  collegeNameError: any;
  educationLevelError: any;
  educationFieldError: any;
  workWithError: any;
  companyNameError: any;
  annualIncomeError: any;

  bodyTypeError: any;
  skinTypeError: any;
  smokeCheckError: any;
  drinkCheckError: any;
  dietCheckError: any;
  heightCheckError: any;

  aboutYourselfError: any;
  physicalDisabilityError: any;

  duplicateMobile:boolean = false

  status: any = '';

  constructor(private router: Router, private fb: FormBuilder, private ls: LoginService, private cs: CookieService) { }

  ngOnInit() {

    if (this.cs.hasItem("user_id")){
      this.router.navigate(["/profile/findmatch"]);
    }
    this.initFormDetails();
    this.getTitle();
  }

  initFormDetails() {
    this.basicDetail = this.fb.group({
      name: ['', Validators.required],
      title: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      mobile: ['', Validators.required]
    })

    this.addressDetail = this.fb.group({
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', Validators.required]
    })

    this.qualificationAndWorkingDetails = this.fb.group({
      collegeName: ['', Validators.required],
      educationLevel: ['', Validators.required],
      educationField: ['', Validators.required],
      workWith: ['', Validators.required],
      companyName: ['', Validators.required],
      annualIncome: ['', Validators.required]
    })

    this.dietHightUpdate = this.fb.group({
      bodyType: ['', Validators.required],
      skinType: ['', Validators.required],
      smokeCheck: ['', Validators.required],
      drinkCheck: ['', Validators.required],
      dietCheck: ['', Validators.required],
      heightCheck: ['', Validators.required]
    })

    this.aboutUser = this.fb.group({
      aboutYourself: ['', Validators.required],
      physicalDisability: ['', Validators.required]
    })
  }

  getTitle() {
    this.ls.getKambojTitles().subscribe((res: any) => {
      if (res.success) {
        this.titles = res.message;
      } else {
        console.log("something went wrong")
      }
    })
  }

  saveBasicInformation() {

    this.nameError = this.basicDetail.controls.name.invalid;
    this.dateOfBirthError = this.basicDetail.controls.dateOfBirth.invalid;
    this.titleError = this.basicDetail.controls.title.invalid;
    this.mobileError = this.basicDetail.controls.mobile.invalid;


    if (!this.nameError && !this.dateOfBirthError && !this.titleError && !this.mobileError && this.cs.hasItem("userId")) {

      let object = {
        name: this.basicDetail.value.name,
        title: this.basicDetail.value.title,
        dateOfBirth: this.basicDetail.value.dateOfBirth,
        mobileNumber: this.basicDetail.value.mobile,
        userId: this.cs.getItem('userId')
      }

      this.ls.saveDetails(object).subscribe((res: any) => {
        if (res.success) {
          this.userInfoId = res.data._id;
          this.duplicateMobile = false;
        
          if (this.cs.hasItem("user_id")) { this.cs.removeItem("user_id", null, null) }
          this.cs.setItem("user_id", this.userInfoId, 24 * 3600, "/", null, null)

          this.status = "true";
        } else {
          if (res.code == 302){
            this.duplicateMobile = true;
          }
          this.status = "false";
        }
      })
    } else {
      if (!this.cs.hasItem("userId")) {
        this.cs.logout();
      } else {
        console.log("fill the form");
      }
    }

  }

  saveAddressDetails() {

    this.addressError = this.addressDetail.controls.address.invalid;
    this.cityError = this.addressDetail.controls.city.invalid;
    this.stateError = this.addressDetail.controls.state.invalid;
    this.pincodeError = this.addressDetail.controls.pincode.invalid;

    if (!this.addressError && !this.cityError && !this.stateError && !this.pincodeError && this.cs.hasItem("user_id")) {

      let object = {
        address: this.addressDetail.value.address,
        city: this.addressDetail.value.city,
        state: this.addressDetail.value.state,
        pincode: this.addressDetail.value.pincode,
        userId: this.cs.getItem('user_id')
      }

      this.ls.updateAddress(object).subscribe((res: any) => {
        if (res.success) {
          this.status = "true";
        } else {
          this.status = "false";
        }
      })

    } else {
      if (!this.cs.hasItem("userId") || this.cs.hasItem("user_id")) {
        this.cs.logout();
      } else {
        console.log("fill the form");
      }
    }

  }

  saveQualificationDetails() {

    this.collegeNameError = this.qualificationAndWorkingDetails.controls.collegeName.invalid;
    this.educationLevelError = this.qualificationAndWorkingDetails.controls.educationLevel.invalid;
    this.educationFieldError = this.qualificationAndWorkingDetails.controls.educationField.invalid;
    this.workWithError = this.qualificationAndWorkingDetails.controls.workWith.invalid;
    this.companyNameError = this.qualificationAndWorkingDetails.controls.companyName.invalid;
    this.annualIncomeError = this.qualificationAndWorkingDetails.controls.annualIncome.invalid;

    if (!this.collegeNameError && !this.educationLevelError && !this.educationFieldError && !this.workWithError && !this.companyNameError && !this.annualIncomeError && this.cs.hasItem("user_id")) {

      let object = {
        collegeName: this.qualificationAndWorkingDetails.value.collegeName,
        educationLevel: this.qualificationAndWorkingDetails.value.educationLevel,
        educationField: this.qualificationAndWorkingDetails.value.educationField,
        workWith: this.qualificationAndWorkingDetails.value.workWith,
        companyName: this.qualificationAndWorkingDetails.value.companyName,
        annualIncome: this.qualificationAndWorkingDetails.value.annualIncome,
        userId: this.cs.getItem('user_id')
      }

      this.ls.updateQualification(object).subscribe((res: any) => {
        if (res.success) {
          this.status = "true";
        } else {
          this.status = "false";
        }
      })

    } else {
      if (!this.cs.hasItem("userId") || this.cs.hasItem("user_id")) {
        this.cs.logout();
      } else {
        console.log("fill the form");
      }
    }

  }

  dietHightCheck() {
    this.bodyTypeError = this.dietHightUpdate.controls.bodyType.invalid;
    this.skinTypeError = this.dietHightUpdate.controls.skinType.invalid;
    this.smokeCheckError = this.dietHightUpdate.controls.smokeCheck.invalid;
    this.drinkCheckError = this.dietHightUpdate.controls.drinkCheck.invalid;
    this.dietCheckError = this.dietHightUpdate.controls.dietCheck.invalid;
    this.heightCheckError = this.dietHightUpdate.controls.heightCheck.invalid;

    if (!this.bodyTypeError && !this.skinTypeError && !this.smokeCheckError && !this.drinkCheckError && !this.dietCheckError && !this.heightCheckError && this.cs.hasItem("user_id")) {

      let object = {
        bodyType: this.dietHightUpdate.value.bodyType,
        skinType: this.dietHightUpdate.value.skinType,
        smokeCheck: this.dietHightUpdate.value.smokeCheck,
        drinkCheck: this.dietHightUpdate.value.drinkCheck,
        dietCheck: this.dietHightUpdate.value.dietCheck,
        heightCheck: this.dietHightUpdate.value.heightCheck,
        userId: this.cs.getItem('user_id')

      }

      this.ls.updateDietHeight(object).subscribe((res: any) => {
        if (res.success) {
          this.status = "true";
        } else {
          this.status = "false";
        }
      })

    } else {
      if (!this.cs.hasItem("userId") || this.cs.hasItem("user_id")) {
        this.cs.logout();
      } else {
        console.log("fill the form");
      }
    }
  }

  almostDoneDetail() {

    this.aboutYourselfError = this.aboutUser.controls.aboutYourself.invalid;
    this.physicalDisabilityError = this.aboutUser.controls.physicalDisability.invalid;

    if (!this.aboutYourselfError && !this.physicalDisabilityError && this.cs.hasItem("user_id")) {

      let object = {
        aboutYourself: this.aboutUser.value.aboutYourself,
        physicalDisability: this.aboutUser.value.physicalDisability,
        userId: this.cs.getItem('user_id')
      }

      this.ls.aboutYourself(object).subscribe((res: any) => {
        if (res.success) {
          this.status = "true";
        } else {
          this.status = "false";
        }
      })

    } else {
      if (!this.cs.hasItem("userId") || this.cs.hasItem("user_id")) {
        this.cs.logout();
      } else {
        console.log("fill the form");
      }
    }

  }

  wayToProfile(){
    this.status = '';
    this.router.navigate(["/profile/findmatch"]);
  }

}
