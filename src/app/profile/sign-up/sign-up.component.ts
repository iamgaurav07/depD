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
  optForm: FormGroup;

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

  duplicateMobile: boolean = false;

  fileName: any = '';
  formD: any;
  otpError: any;
  otpSuccess: any;

  status: any = '';
  states: any = [];
  cities: any = [];

  loader: boolean = true;

  isPicUpload: boolean = false;

  constructor(private router: Router, private fb: FormBuilder, private ls: LoginService, private cs: CookieService) { }

  ngOnInit() {

    if (this.cs.hasItem("user_id")) {
      this.router.navigate(["/profile/findmatch"]);
    }
    this.initFormDetails();
    this.getTitle();
    this.getAllState();
  }

  initFormDetails() {
    this.basicDetail = this.fb.group({
      name: ['', Validators.required],
      title: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      mobile: ['', Validators.required]
    })

    this.optForm = this.fb.group({
      otp: ['', Validators.required]
    })
  }

  initAddressForm() {
    this.addressDetail = this.fb.group({
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', Validators.required]
    })
  }

  initqualificationAndWorkingDetailsForm() {
    this.qualificationAndWorkingDetails = this.fb.group({
      collegeName: ['', Validators.required],
      educationLevel: ['', Validators.required],
      educationField: ['', Validators.required],
      workWith: ['', Validators.required],
      companyName: ['', Validators.required],
      annualIncome: ['', Validators.required]
    })
  }

  initaboutUserForm() {
    this.aboutUser = this.fb.group({
      aboutYourself: ['', Validators.required],
      physicalDisability: ['', Validators.required]
    })
  }


  dietHightUpdateForm() {
    this.dietHightUpdate = this.fb.group({
      bodyType: ['', Validators.required],
      skinType: ['', Validators.required],
      smokeCheck: ['', Validators.required],
      drinkCheck: ['', Validators.required],
      dietCheck: ['', Validators.required],
      heightCheck: ['', Validators.required]
    })
  }

  getTitle() {
    this.loader = true;
    this.ls.getKambojTitles().subscribe((res: any) => {
      if (res.success) {
        this.loader = false;
        this.titles = res.message;
      } else {
        this.loader = false;
        console.log("something went wrong")
      }
    })
  }

  saveBasicInformation() {

    this.nameError = this.basicDetail.controls.name.invalid;
    this.dateOfBirthError = this.basicDetail.controls.dateOfBirth.invalid;
    this.titleError = this.basicDetail.controls.title.invalid;
    this.mobileError = this.basicDetail.controls.mobile.invalid;


    if (!this.nameError && !this.dateOfBirthError && !this.titleError && !this.mobileError && this.cs.hasItem("userId") && this.cs.hasItem("gender")) {
      this.loader = true;

      let object = {
        name: this.basicDetail.value.name,
        title: this.basicDetail.value.title,
        dateOfBirth: this.basicDetail.value.dateOfBirth,
        mobileNumber: this.basicDetail.value.mobile,
        userId: this.cs.getItem('userId'),
        gender: this.cs.getItem('gender')
      }

      this.ls.saveDetails(object).subscribe((res: any) => {
        if (res.success) {
          this.userInfoId = res.data._id;
          this.duplicateMobile = false;

          if (this.cs.hasItem("user_id")) { this.cs.removeItem("user_id", null, null) }
          this.cs.setItem("user_id", this.userInfoId, 24 * 3600, "/", null, null)
          this.initAddressForm();
          this.status = "true";
          this.loader = false;
        } else {
          if (res.code == 302) {
            this.duplicateMobile = true;
            this.loader = false;
          }
          this.status = "false";
          this.loader = false;
        }
      })

    } else {
      this.loader = false;
    }

  }

  saveAddressDetails() {

    this.addressError = this.addressDetail.controls.address.invalid;
    this.cityError = this.addressDetail.controls.city.invalid;
    this.stateError = this.addressDetail.controls.state.invalid;
    this.pincodeError = this.addressDetail.controls.pincode.invalid;

    if (!this.addressError && !this.cityError && !this.stateError && !this.pincodeError && this.cs.hasItem("user_id")) {
      this.loader = true;
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
          this.initqualificationAndWorkingDetailsForm()
          this.loader = false;
        } else {
          this.status = "false";
          this.loader = false;
        }
      })

    } else {
      this.loader = false;
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
      this.loader = true;
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
          this.dietHightUpdateForm();
          this.loader = false;
        } else {
          this.status = "false";
          this.loader = false;
        }
      })

    } else {
      console.log("fill the form");
      this.loader = false;
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
      this.loader = true;
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
          this.initaboutUserForm();
          this.loader = false;
        } else {
          this.status = "false";
          this.loader = false;
        }
      })

    } else {
        this.loader = false;
    }
  }

  almostDoneDetail() {

    this.aboutYourselfError = this.aboutUser.controls.aboutYourself.invalid;
    this.physicalDisabilityError = this.aboutUser.controls.physicalDisability.invalid;

    if (!this.aboutYourselfError && !this.physicalDisabilityError && this.cs.hasItem("user_id")) {
      this.loader = true;
      let object = {
        aboutYourself: this.aboutUser.value.aboutYourself,
        physicalDisability: this.aboutUser.value.physicalDisability,
        userId: this.cs.getItem('user_id')
      }

      this.ls.aboutYourself(object).subscribe((res: any) => {
        if (res.success) {
          this.status = "true";
          let object = {
            user: res.data._id,
            number: res.data.mobileNumber
          }
          this.ls.mobileVerify(object).subscribe((rs: any) => {
            if (rs.success) {
              if (this.cs.hasItem("mobileNumber")) { this.cs.removeItem("mobileNumber", null, null) }
              this.cs.setItem("mobileNumber", res.data.mobileNumber, 24 * 3600, "/", null, null);
              this.loader = false;

              $("#otpModal").modal('show');
            } else {
              this.loader = false;
            }
          })
        } else {
          this.status = "false";
          this.loader = false;
        }
      })

    } else {
        this.loader = false;
    }

  }

  updateProfilePic(event) {
    if (event.target.files) {
      this.loader = true;
      this.formD = new FormData();
      const file: File = event.target.files[0];

      this.fileName = file.name
      this.formD.append('file', file, file.name)

      this.ls.fileUpload(this.formD).subscribe((res: any) => {
        if (res.success) {
          this.isPicUpload = true;
          this.loader = false;
        } else {
          this.loader = false;
        }
      })
    }

  }

  verifyOtp() {
    this.otpError = this.optForm.controls.otp.invalid;

    if (!this.otpError && this.cs.hasItem("mobileNumber")) {
      this.loader = true;
      let obj = {
        id: this.cs.getItem("user_id"),
        otp: this.optForm.value.otp,
        mobile: this.cs.getItem("mobileNumber")
      }
      this.ls.checkOtp(obj).subscribe((res: any) => {
        if (res.success) {
          console.log("verified");
          this.otpSuccess = true;
          setInterval(() => {
            $("#otpModal").modal('hide');
            this.status = '';
            this.loader = false;
            this.router.navigate(["/profile/findmatch"]);
          }, 2000);
        } else {
          this.otpSuccess = true;
          this.loader = false;
        }
      })
    }

  }

  wayToProfile() {
    this.status = '';
    $("#otpModal").modal('hide');
    this.router.navigate(["/profile/findmatch"]);
  }

  async getAllState() {
    this.loader = true;
    await this.ls.getAllStates().subscribe((res: any) => {
      if (res.success) {
        this.loader = false;
        this.states = res.message
      } else {
        this.loader = false;
      }

    })
  }

  async getCity(value) {
    console.log("asdf");
    this.loader = true;
    await this.ls.getCities(value).subscribe((res: any) => {
      this.cities = [];
      if (res.success) {
        this.loader = false;
        this.cities = res.message
      } else {
        this.loader = false;
      }

    })
  }

}
