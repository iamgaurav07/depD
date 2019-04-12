import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { CookieService } from '../../common-services/cookie.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

declare var $: any

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userData: any;
  fileName: any = '';
  formD: any;

  isFileUploaded: boolean = false;
  loader: boolean = true;

  basicDetail: FormGroup;
  optForm: FormGroup;
  dietHightUpdate: FormGroup;

  titles: any = [];

  cities: any = [];
  states: any = [];

  nameError: any;
  titleError: any;
  emailError: any;
  mobileError: any;
  genderError: any;
  addressError: any;
  cityError: any;
  stateError: any;
  pincodeError: any;
  aboutError: any;
  physicalDisabilityError: any;

  collegeNameError: any;
  educationLevelError: any;
  educationFieldError: any;
  workWithError: any;
  companyNameError: any;
  annualIncomeError: any;
  updateLoader: any;

  bodyTypeError: any;
  skinTypeError: any;
  smokeCheckError: any;
  drinkCheckError: any;
  dietCheckError: any;
  heightCheckError: any;

  formGroup = this.fb.group({
    file: [null, Validators.required]
  });

  workQualificationForm: FormGroup;

  constructor(private ls: LoginService, private cs: CookieService, private fb: FormBuilder, private router: Router) {

  }

  ngOnInit() {
    if (this.cs.hasItem("userId") && this.cs.hasItem("user_id") && this.cs.hasItem("token")) {
      this.getUserProfileDetails();
      this.initFormDetails();
      this.getTitle();
      this.getAllState();
    } else {
      this.cs.logout();
    }
  }

  initFormDetails() {
    this.basicDetail = this.fb.group({
      name: ['', Validators.required],
      title: ['', Validators.required],
      email: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      mobile: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', Validators.required],
      about: ['', Validators.required],
      physicalDisability: ['', Validators.required]
    })

    this.workQualificationForm = this.fb.group({
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

    this.optForm = this.fb.group({
      otp: ['', Validators.required]
    })
  }

  getUserProfileDetails() {
    let object = {
      id: this.cs.getItem('userId'),
      user_id: this.cs.getItem('user_id')
    }

    this.ls.getUserProfileDetails(object).subscribe((res: any) => {
      if (res.success) {
        this.userData = res.data;
        this.getCity(this.userData.state._id);
        this.loader = false;

        this.basicDetail.patchValue({
          name: this.userData.name,
          title: this.userData.title._id,
          email: this.userData.userId.email,
          mobile: this.userData.mobileNumber,
          gender: this.userData.userId.gender,
          address: this.userData.address,
          city: this.userData.city._id,
          state: this.userData.state._id,
          pincode: this.userData.pincode,
          about: this.userData.aboutUser,
        })

        this.workQualificationForm.patchValue({
          collegeName: this.userData.universityName,
          educationLevel: this.userData.educationLevel,
          educationField: this.userData.educationField,
          workWith: this.userData.workWith,
          companyName: this.userData.companyName,
          annualIncome: this.userData.annualIncome
        })

        this.dietHightUpdate = this.fb.group({
          bodyType: this.userData.bodyType,
          skinType: this.userData.skinTone,
          smokeCheck: this.userData.smokeCheck,
          drinkCheck: this.userData.drinkCheck,
          dietCheck: this.userData.dietCheck,
          heightCheck: this.userData.heightCheck 
        })
        
      } else {
        console.log("something went wrong");
      }
    })
  }

  fileUpload() {
    $('#fileUploadModal').modal('show')
  }

  fileSizeCheck: any = '';

  updateProfilePic(event) {
    this.formD = new FormData();
    const file: File = event.target.files[0];
    if (event.target.files[0].size <= 3302641) {
      this.fileSizeCheck = false;
      this.fileName = file.name
      this.formD.append('file', file, file.name)
    } else {
      this.fileSizeCheck = true;
    }


  }

  upload() {
    this.ls.fileUpload(this.formD).subscribe((res: any) => {
      if (res.success) {
        this.isFileUploaded = true;
        setTimeout(() => { $('#fileUploadModal').modal('hide'); }, 1000);
        setTimeout(() => { location.reload() }, 2000);
      }
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

  async getAllState() {
    await this.ls.getAllStates().subscribe((res: any) => {
      if (res.success) {
        this.states = res.message
      } else {
        this.loader = false;
      }

    })
  }

  async getCity(value) {
    await this.ls.getCities(value).subscribe((res: any) => {
      this.cities = [];
      if (res.success) {

        this.cities = res.message
      } else {

      }

    })
  }

  basiceDetailsUpdate() {
    this.nameError = this.basicDetail.controls.name.invalid;
    this.titleError = this.basicDetail.controls.title.invalid;
    this.emailError = this.basicDetail.controls.email.invalid;
    this.mobileError = this.basicDetail.controls.mobile.invalid;
    this.genderError = this.basicDetail.controls.gender.invalid;
    this.addressError = this.basicDetail.controls.address.invalid;
    this.cityError = this.basicDetail.controls.city.invalid;
    this.stateError = this.basicDetail.controls.state.invalid;
    this.pincodeError = this.basicDetail.controls.pincode.invalid;
    this.aboutError = this.basicDetail.controls.about.invalid;

    if (!this.nameError && !this.titleError && !this.emailError && !this.mobileError && !this.genderError && !this.addressError && !this.cityError && !this.stateError && !this.pincodeError && !this.aboutError) {

      this.updateLoader = true;
      let object = {
        name: this.basicDetail.value.name,
        title: this.basicDetail.value.title,
        email: this.basicDetail.value.email,
        mobile: this.basicDetail.value.mobile,
        gender: this.basicDetail.value.gender,
        address: this.basicDetail.value.address,
        city: this.basicDetail.value.city,
        state: this.basicDetail.value.state,
        pincode: this.basicDetail.value.pincode,
        about: this.basicDetail.value.about
      }

      this.ls.updateBasicDetails(object).subscribe((res: any) => {
        if (res.success) {
          $('#exampleModalCenter').modal('hide'); this.updateLoader = false;;
          setTimeout(() => { location.reload() }, 500);
        } else {
          this.updateLoader = false;
          setTimeout(() => { $('#exampleModalCenter').modal('hide'); }, 1000);
          console.log("something went wrong")
        }
      })
    } else {
      this.updateLoader = false;
      console.log("empty fields")
    }
  }

  workQualificationUpdate() {
    this.collegeNameError = this.workQualificationForm.controls.collegeName.invalid;
    this.educationLevelError = this.workQualificationForm.controls.educationLevel.invalid;
    this.educationFieldError = this.workQualificationForm.controls.educationField.invalid;
    this.workWithError = this.workQualificationForm.controls.workWith.invalid;
    this.companyNameError = this.workQualificationForm.controls.companyName.invalid;
    this.annualIncomeError = this.workQualificationForm.controls.annualIncome.invalid;

    if (!this.collegeNameError && !this.educationLevelError && !this.educationFieldError && !this.workWithError && !this.companyNameError && !this.annualIncomeError && this.cs.hasItem("user_id")) {
      this.updateLoader = true;
      let object = {
        collegeName: this.workQualificationForm.value.collegeName,
        educationLevel: this.workQualificationForm.value.educationLevel,
        educationField: this.workQualificationForm.value.educationField,
        workWith: this.workQualificationForm.value.workWith,
        companyName: this.workQualificationForm.value.companyName,
        annualIncome: this.workQualificationForm.value.annualIncome,
        userId: this.cs.getItem('user_id')
      }

      console.log("asdfsdf", object);

      this.ls.updateQualification(object).subscribe((res: any) => {
        if (res.success) {
          $('#workQualification').modal('hide'); this.updateLoader = false;;
          setTimeout(() => { location.reload() }, 500);
        } else {
          this.updateLoader = false;
          setTimeout(() => { $('#workQualification').modal('hide'); }, 1000);
          console.log("something went wrong")
        }
      })

    } else {
      console.log("fill the form");
      this.updateLoader = false;
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
          $('#dietHightCheck').modal('hide'); this.updateLoader = false;;
          setTimeout(() => { location.reload() }, 500);
        } else {
          this.updateLoader = false;
          setTimeout(() => { $('#dietHightCheck').modal('hide'); }, 1000);
        }
      })

    } else {
      this.loader = false;
    }
  }
}
