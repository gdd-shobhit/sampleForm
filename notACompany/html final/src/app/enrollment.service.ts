import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User } from '../user';
import { Loginusers } from './loginusers';
import { Observable } from 'rxjs';
import { Details } from './details';
import { Router } from '@angular/router'
import { Change } from './change';
import { OTP } from './otp';
import {Changep } from './changep'
@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  _url = 'http://localhost:3000/enroll';
  __url = 'http://localhost:3000/login';
  configUrl = 'http://localhost:3000/login/user';
  newurl = 'http://localhost:3000/forgotPassword';
  OTPurl = 'http://localhost:3000/forgotPassword/enterOtp';
  final = 'http://localhost:3000/changePassword';
  constructor(private _http: HttpClient, private _router: Router) { }

  enroll(user: User){
    return this._http.post<any>(this._url, user);
  }

  login(loginuserModle: Loginusers){
    return this._http.post<any>(this.__url, loginuserModle);
  }

  newpass(change: Change){
    return this._http.post<any>(this.newurl, change);
  }

  newOTP(otp: OTP){
    return this._http.post<any>(this.OTPurl, otp);
  }

  finalChange(changep :Changep){
    return this._http.post<any>(this.final, changep );
  }

  getConfig(): Observable<Details[]>{
    return this._http.get<Details[]>(this.configUrl);
  }

  loggedIn(){
    return !!localStorage.getItem('token')
  }

  getToken(){
    return localStorage.getItem('token')
    
  }

  deleteToken(){
    localStorage.removeItem('token')
    this._router.navigateByUrl('/login')
  }
}
