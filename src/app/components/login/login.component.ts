import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  btns!: NodeList;

  // login
  isLoadingLogin: boolean = false
  errorMessageLogin: string = ''
  search: string = ''

  loginform: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&\^\-\_=+()]{8,}$/)]),
  })
  // login

  // register
  errorMessageRegister: string = ''
  isLoadingRegister: boolean = false

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.maxLength(8), Validators.minLength(3)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&\^\-\_=+()]{8,}$/)]),
    rePassword: new FormControl(null, Validators.required),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)])
  }, { validators: this.repasswordMatching })
  // register

  constructor(private _authser: AuthenticationService, private _router: Router, private _cartService: CartService, private elemtref: ElementRef) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') != null) {
      this._router.navigate(['/home'])
    }

    // Add class animate to change animation between login and register
    this.btns = document.querySelectorAll('.panels-container .btn')
    this.btns.forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelector('.component-container')?.classList.toggle('animate')
        this.registerForm.reset()
        this.loginform.reset()
        this.errorMessageLogin = ''
        this.errorMessageRegister = ''
      })
    });

    //set value to inputs when there's value written
    (document.querySelectorAll('input') as NodeList).forEach(input => {
      input.addEventListener('keyup', () => {
        (input as HTMLInputElement).setAttribute('value', (input as HTMLInputElement).value)
      })

    })

    //Small Screen btn toggle sign in and up
    document.querySelector('.btnChange')?.addEventListener('click', () => {
      this.toggleBtn()
    })
  }

  login(loginform: FormGroup) {

    this.isLoadingLogin = true

    this._authser.login(loginform.value).subscribe({

      next: (authResponse) => {

        localStorage.setItem('token', authResponse.token)
        this._authser.decodeToken()
        this._cartService.getAllCart().subscribe({
          next: (cartResponse) => {
            this._cartService.noOfCartItems.next(cartResponse.numOfCartItems)
          },
          error: (err) => {
            console.log(err);
          }
        })
      }
      ,
      error: (err) => {
        this.isLoadingLogin = false
        console.log(err);
        this.errorMessageLogin = err.error.message
      }
      ,
      complete: () => {
        this._router.navigate(['./home'])
      },
    })


  }

  // register
  submit(registerForm: FormGroup) {

    if (registerForm.invalid) {
      // for (let controlName in registerForm.controls) {
      // if (registerForm.controls.hasOwnProperty(controlName)) {
      // console.log('tmam');

      // }
      // }


      document.querySelectorAll('.alert').forEach(div => {
        (div as HTMLElement).style.animationPlayState = 'running'
        setTimeout(() => {
          (div as HTMLElement).style.animationPlayState = 'paused'
        }, 600);
      })

    }
    else {

      this.isLoadingRegister = true
      this._authser.register(registerForm.value).subscribe({
        next: () => {
          this.errorMessageRegister = ''
          this.isLoadingRegister = false
          this._router.navigate(['./login'])

        },

        error: (err) => {
          console.log(err);

          this.errorMessageRegister = err.error.message
          this.isLoadingRegister = false
        },
        complete: () => {
          if (window.matchMedia('(max-width: 770px)').matches) {
            document.getElementById('email-login')?.focus();
            this.loginform.controls['email'].setValue(registerForm.controls['email'].value);
            (document.getElementById('email-login') as HTMLInputElement).setAttribute('value', (document.getElementById('email-login') as HTMLInputElement).value);
            this.errorMessageLogin = ''
            this.errorMessageRegister = ''
            this.toggleBtn();
          }
          else {
            document.querySelector('.component-container')?.classList.toggle('animate')
            document.getElementById('email-login')?.focus();
            this.loginform.controls['email'].setValue(registerForm.controls['email'].value);
            (document.getElementById('email-login') as HTMLInputElement).setAttribute('value', (document.getElementById('email-login') as HTMLInputElement).value);
            this.errorMessageLogin = ''
            this.errorMessageRegister = ''
            this.registerForm.reset()
          }
        }
      })
    }
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
  // register

  // Small screen toggle btn
  toggleBtn() {
    this.registerForm.reset()
    // this.loginform.reset()
    if ((document.querySelector('.btnChange') as HTMLButtonElement).innerText == 'Sign Up') {
      (document.querySelector('.btnChange') as HTMLElement).innerText = 'Sign In';
      (document.querySelector('.login-form') as HTMLElement).style.transform = 'translateY(100%)';
      (document.querySelector('.login-form') as HTMLElement).style.opacity = '0';
      setTimeout(() => {
        (document.querySelector('.register-form') as HTMLElement).style.transform = 'translateY(0)';
        (document.querySelector('.register-form') as HTMLElement).style.opacity = '1';
      }, 1000);

    }
    else if ((document.querySelector('.btnChange') as HTMLElement).innerText == 'Sign In') {
      (document.querySelector('.btnChange') as HTMLElement).innerText = 'Sign Up';
      (document.querySelector('.login-form') as HTMLElement).style.opacity = '1';
      (document.querySelector('.login-form') as HTMLElement).style.transform = 'translateY(0)';

      (document.querySelector('.register-form') as HTMLElement).style.transform = 'translateY(-100%)';
      (document.querySelector('.register-form') as HTMLElement).style.opacity = '0';

    }
  }

}