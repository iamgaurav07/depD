import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { routes} from './app.route';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from "@angular/common/http";

import {InterceptorService} from './common-services/interceptor.service';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AlertModule } from 'ngx-bootstrap/alert';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),HttpClientModule,
    BsDatepickerModule.forRoot(), AlertModule.forRoot()
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
