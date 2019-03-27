import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FormBuilder, FormGroup, FormControl, FormsModule, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';


@NgModule({
  declarations: [HomeComponent, HeaderComponent],
  imports: [
    CommonModule,
    LandingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class LandingModule { }
