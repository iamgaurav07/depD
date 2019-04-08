import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { CookieService } from '../../common-services/cookie.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  formGroup = this.fb.group({
    file: [null, Validators.required]
  });

  constructor(private ls: LoginService, private cs: CookieService, private fb: FormBuilder) {

  }

  ngOnInit() {
    if (this.cs.hasItem("userId") && this.cs.hasItem("user_id") && this.cs.hasItem("token")) {
      this.getUserProfileDetails();
    } else {
      this.cs.logout();
    }
  }

  getUserProfileDetails() {
    console.log('user profile');
    let object = {
      id: this.cs.getItem('userId'),
      user_id: this.cs.getItem('user_id')
    }

    this.ls.getUserProfileDetails(object).subscribe((res: any) => {
      if (res.success) {
        this.userData = res.data;
      } else {
        console.log("something went wrong");
      }
    })
  }

  fileUpload() {
    console.log("working")
    $('#fileUploadModal').modal('show')
  }

  updateProfilePic(event) {
    this.formD = new FormData();
    const file: File = event.target.files[0];

    console.log("file", file);

    this.fileName = file.name
    this.formD.append('file', file, file.name)
  }

  upload(){
    this.ls.fileUpload(this.formD).subscribe((res: any) => {
      console.log("asdf")
    })
  }
}
