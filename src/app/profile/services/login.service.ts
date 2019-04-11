import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient:HttpClient) { }

  getKambojTitles(){
    return this.httpClient.post(environment.baseURL + 'getTitles', {})
  }

  saveDetails(obj){
    return this.httpClient.post(environment.baseURL + 'saveUserInformations', {data: obj})
  }

  updateAddress(obj){
    return this.httpClient.post(environment.baseURL + 'updateUserAddress', {data: obj})
  }

  updateQualification(obj){
    return this.httpClient.post(environment.baseURL + 'updateQualification', {data: obj})
  }

  updateDietHeight(obj){
    return this.httpClient.post(environment.baseURL + 'updateDietHeight', {data: obj})
  }

  aboutYourself(obj){
    return this.httpClient.post(environment.baseURL + 'aboutYourself', {data: obj})
  }

  getUserDetail(obj){
    return this.httpClient.post(environment.baseURL + 'getuser', {data: obj})
  }

  getUserProfileDetails(obj){
    return this.httpClient.post(environment.baseURL + 'getUserProfileDetails', {data: obj})
  }

  getPatnerListing(obj){
    return this.httpClient.post(environment.baseURL + 'patnerListing', {data: obj})
  }

  mobileVerify(obj){
    return this.httpClient.post(environment.baseURL + 'verifyMobile', {data: obj})
  }

  checkOtp(obj){
    return this.httpClient.post(environment.baseURL + 'checkOtp', {data: obj})
  }

  fileUpload(obj){
    return this.httpClient.post(environment.baseURL + 'fileUpload', obj)
  }

  getAllStates(){
    return this.httpClient.post(environment.baseURL + 'getAllStates',{})
  }

  getCities(obj){
    return this.httpClient.post(environment.baseURL + 'getCities',{id:obj})
  }
  
}
