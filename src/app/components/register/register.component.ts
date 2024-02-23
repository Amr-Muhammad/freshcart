import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  errorMessage: string = ''
  isLoading: boolean = false

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.maxLength(8), Validators.minLength(3)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&\^\-\_=+()]{8,}$/)]),
    rePassword: new FormControl(null, Validators.required),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)])
  }, { validators: this.repasswordMatching })

  constructor(private _auth: AuthenticationService, private _router: Router) {

  }

  ngOnInit(): void {
    if (localStorage.getItem('token') != null) {
      this._router.navigate(['/home'])
    }
  }

  submit(registerForm: FormGroup) {

    this.isLoading = true
    this._auth.register(registerForm.value).subscribe({
      next: () => {
        this.errorMessage = ''
        this.isLoading = false
        this._router.navigate(['./login'])

      },

      error: (err) => {
        console.log(err);

        this.errorMessage = err.error.message
        this.isLoading = false
      }
    })



  }


  repasswordMatching(form: any) {

    if (form.controls['rePassword'].value == form.controls['password'].value) {
      return null
    }
    else {
      form.get('rePassword')?.setErrors({ matching: "Password and repassword aren't matched" })
      return null
    }
  }

}






//! rage3 elgoz2 da
// passwordMatching(form: any) {

//   if (form.controls['password'].value == form.controls['rePassword'].value) {
//     return null
//   } else {
//     form.get('rePassword')?.setErrors({ matching: "Password and Repassword aren't matched" })
//     return null
//   }

// }