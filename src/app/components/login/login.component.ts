import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  isLoading: boolean = false
  errorMessage: string = ''
  search: string = ''


  constructor(private _authser: AuthenticationService, private _router: Router, private _cartService: CartService) {
    if (localStorage.getItem('token') != null) {
    }
  }

  ngOnInit(): void {
    if (localStorage.getItem('token') != null) {
      this._router.navigate(['/home'])
    }
  }

  loginform: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&\^\-\_=+()]{8,}$/)]),
  })


  login(loginform: FormGroup) {

    this.isLoading = true

    this._authser.login(loginform.value).subscribe({

      next: (response) => {

        localStorage.setItem('token', response.token)
        this._authser.decodeToken()
        // this._cartService.options.headers.token = response.token;

        this._cartService.getAllCart().subscribe({
          next: () => {
            this._cartService.noOfCartItems.next(response.numOfCartItems)
          },
          error: (err) => {
            console.log(err);
          }
        })
      }
      ,
      error: (err) => {
        this.isLoading = false
        console.log(err);

        this.errorMessage = err.message
        // return EMPTY;
      }
      ,
      complete: () => {
        this._router.navigate(['./home'])

      },
    })

  }

}



// {

//   next: (response) => {
//     console.log(response);

//     localStorage.setItem('token', response.token)
//     this._authser.decodeToken()
//     this._cartService.options.headers.token = response.token;

//     // this._cartService.getAllCart().subscribe({
//     //   next: () => {
//     //     this._cartService.noOfCartItems.next(response.numOfCartItems)
//     //   },
//     //   error: (err) => {
//     //     console.log(err);
//     //   }
//     // })
//   }
//   ,
//   error: (err) => {
//     this.isLoading = false
//     console.log(err);

//     this.errorMessage = err.message
//     // return EMPTY;
//   }
//   ,
//   complete: () => {
//     this._router.navigate(['./home'])

//   },
// }