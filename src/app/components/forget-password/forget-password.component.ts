import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent implements OnInit {

  entered: boolean = true
  disableBtn: boolean = false
  resetCodeErrorMessage: string = ''
  requestSent: boolean = false


  constructor(private _auth: AuthenticationService) {

  }

  ngOnInit(): void {
    document.getElementById('input')?.addEventListener('keyup', function () {
      // console.log(document.getElementById('input')?.value);


    })
  }

  forgetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl(null)
  })

  resetCodeForm: FormGroup = new FormGroup({
    resetCode: new FormControl(null)
  })

  resetPassword(forgetPasswordForm: FormGroup) {
    if (forgetPasswordForm.value.email == null) {

      this.entered = false

    } else {
      this.entered = true
      this.disableBtn = true
      this._auth.forgetPassword(forgetPasswordForm.value).subscribe({
        next: (response) => {
          this.requestSent = true
          this.disableBtn = false


        },
        error: (err) => {
          console.log(err);
          this.disableBtn = false


        }
      })

    }


  }

  resetCode(resetCodeForm: FormGroup) {
    this._auth.resetCode(resetCodeForm.value).subscribe({
      next: (response) => {
        console.log(response);
        this.resetCodeErrorMessage = ''

      }, error: (err) => {
        this.resetCodeErrorMessage = err.error.message
      }
    })
  }

}
