import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User } from '../user';
import { Loginusers } from './loginusers';
@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  _url = 'http://localhost:3000/enroll';
  __url = 'http://localhost:3000/login';
  constructor(private _http: HttpClient) { }

  enroll(user: User){
    return this._http.post<any>(this._url, user);
  }

  login(loginuserModle: Loginusers){
    return this._http.post<any>(this.__url, loginuserModle);
  }

  loggedIn(){
    return !!localStorage.getItem('token')
  }

  getToken(){
    return localStorage.getItem('token')
  }

  deleteToken(){
    localStorage.removeItem('token')
  }
}
