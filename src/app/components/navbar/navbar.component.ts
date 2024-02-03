import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { addCart } from 'src/app/interfaces/addCart';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLogged: boolean = true
  noOfCartItems: number = 0

  constructor(private _authser: AuthenticationService, private _router: Router, private _cartService: CartService) {

  }

  ngOnInit(): void {

    this._authser.userData.subscribe(() => {

      if (localStorage.getItem('token') != null) {
        this.isLogged = true
        // _router.navigate(['./home'])
      }

      else {
        this.isLogged = false
        // this._router.navigate(['./login']) //! el line da 3bqryyyyyyy momken y5leny ast8na 3n el gaurd
      }

    })



    this._cartService.getAllCart().subscribe({
      next: (response: addCart) => {
        // this._cartService.noOfCartItems.next(response.numOfCartItems)
        this.noOfCartItems = response.numOfCartItems
      }
      ,
      error(err) {
        // console.log();
        
      },
    })



    this._cartService.noOfCartItems.subscribe((changeInNumber) => {
      this.noOfCartItems = changeInNumber
    })

  }

  logout() {
    this._authser.logout()
  }
}



