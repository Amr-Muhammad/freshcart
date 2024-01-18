import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService implements OnInit {

  baseUrl: string = 'https://ecommerce.routemisr.com'
  userData: BehaviorSubject<any> = new BehaviorSubject(null)


  constructor(private _hhttpClient: HttpClient, private _router: Router) {


  }

  ngOnInit(): void {
    if (localStorage.getItem('token') != null) {
      this.decodeToken()
    }
  }

  register(registerForm: FormGroup): Observable<any> {
    return this._hhttpClient.post(`${this.baseUrl}/api/v1/auth/signup`, registerForm)
  }

  login(loginFormData: FormGroup): Observable<any> {
    return this._hhttpClient.post(`${this.baseUrl}/api/v1/auth/signin`, loginFormData)
  }

  decodeToken() {
    this.userData.next(jwtDecode(JSON.stringify(localStorage.getItem('token'))))
    console.log(this.userData.getValue());
  }

  logout() {
    localStorage.removeItem('token')
    this._router.navigate(['./login'])
    this.userData.next(null)
  }

  forgetPassword(email: any): Observable<any> {
    return this._hhttpClient.post(`${this.baseUrl}/api/v1/auth/forgotPasswords`, email)
  }

  resetCode(resetCodeForm: any): Observable<any> {
    return this._hhttpClient.post(`${this.baseUrl}/api/v1/auth/verifyResetCode`, resetCodeForm)
  }

}
