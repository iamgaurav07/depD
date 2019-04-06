import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { InterceptorService } from '../common-services/interceptor.service'
import { HTTP_INTERCEPTORS } from "@angular/common/http";

import { ProfileRoutingModule } from './profile-routing.module';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AlertModule } from 'ngx-bootstrap/alert';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CapitalizePipe } from './pipes/capitalize.pipe';


@NgModule({
  declarations: [HomeComponent, HeaderComponent, FooterComponent, SignUpComponent, UserProfileComponent, CapitalizePipe],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,ReactiveFormsModule,
    HttpClientModule,BsDatepickerModule,AlertModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }]
})
export class ProfileModule { }
