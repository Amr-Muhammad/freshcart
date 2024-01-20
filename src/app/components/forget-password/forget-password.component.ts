import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent implements OnInit {

  forgetPasswordPage: boolean = true
  resetCodePage: boolean = false
  newPasswordPage: boolean = false
  successfullyChangedPage: boolean = false

  enteredEmail: boolean = true
  forgetPasswordErrorMessage: string = ''
  disableBtn: boolean = false

  resetCodeErrorMessage: string = ''

  newPasswordErrorMessage: string = ''

  constructor(private _auth: AuthenticationService, private _router: Router) {

  }

  ngOnInit(): void {
    document.getElementById('input')?.addEventListener('keyup', function () {
      // console.log(document.getElementById('input')?.value); //!fi hena 7war msh fakro


    })
  }

  forgetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl(null)
  })

  resetCodeForm: FormGroup = new FormGroup({
    resetCode: new FormControl(null)
  })

  newPasswordForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&\^\-\_=+()]{8,}$/)])
  })

  resetPassword(forgetPasswordForm: FormGroup) {
    if (forgetPasswordForm.value.email == null) {

      this.enteredEmail = false

    } else {
      this.enteredEmail = true
      this.disableBtn = true
      this._auth.forgetPassword(forgetPasswordForm.value).subscribe({
        next: (response) => {
          this.forgetPasswordErrorMessage = ""

          this.forgetPasswordPage = false
          this.resetCodePage = true
          this.disableBtn = false
        },

        error: (err) => {
          console.log(err);
          this.forgetPasswordErrorMessage = err.error.message
          console.log(this.forgetPasswordErrorMessage);

          this.disableBtn = false
        }
      })
    }
  }

  resetCode(resetCodeForm: FormGroup) {
    this.disableBtn = true

    this._auth.resetCode(resetCodeForm.value).subscribe({
      next: (response) => {
        this.resetCodeErrorMessage = ''
        if (response.status == "Success") {
          this.resetCodePage = false
          this.newPasswordPage = true
          this.disableBtn = false

        }
      },

      error: (err) => {
        this.disableBtn = false
        this.resetCodeErrorMessage = err.error.message
      }
    })
  }

  newPassword(newPasswordForm: FormGroup) {

    this.disableBtn = true

    this._auth.newPassword(newPasswordForm.value).subscribe({
      next: () => {
        this.newPasswordErrorMessage = ""
        this.newPasswordPage = false
        this.successfullyChangedPage = true
        this.disableBtn = false

        setTimeout(() => {
          this._router.navigate(['./login'])
        }, 3000);

      },

      error: (err) => {
        this.disableBtn = false
        this.newPasswordErrorMessage = err.error.message
      }
    })
  }


}

