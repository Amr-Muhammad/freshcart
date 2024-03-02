import { Component, OnInit } from '@angular/core';
import { allCart } from 'src/app/interfaces/allCart';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartService } from 'src/app/services/cart.service';
import { LoadingScreenService } from 'src/app/services/loading-screen.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLogged: boolean = true
  noOfCartItems: number = 0
  cartNotMessage: boolean = false
  wishlistNotMessage: boolean = false

  mediaQueryList = window.matchMedia('(max-width:991px)')
  cartSmall: boolean = false

  constructor(private _authser: AuthenticationService, private _cartService: CartService, public _loading: LoadingScreenService) { }

  ngOnInit(): void {

    this._authser.userData.subscribe(() => {

      if
        (localStorage.getItem('token') != null) {
        this.isLogged = true
      }

      else {
        this.isLogged = false
      }

    })


    if (localStorage.getItem('token')) {
      this._cartService.getAllCart().subscribe({
        next: (response: allCart) => {
          this._cartService.noOfCartItems.next(response.numOfCartItems)
        }
        ,
        error: (err) => {
          console.log(err);
        }
      })
    }

    this._cartService.noOfCartItems.subscribe((changeInNumber) => {
      this.noOfCartItems = changeInNumber
    })

    this._cartService.cartNotMessage.subscribe((newValue) => {
      this.cartNotMessage = newValue

      setTimeout(() => {
        this.cartNotMessage = false
      }, 3000);
    })

    this._cartService.wishlistNotificationMessage.subscribe((newValue) => {
      this.wishlistNotMessage = newValue

      setTimeout(() => {
        this.wishlistNotMessage = false
      }, 3000);
    })

    //Handle Cart icon in screens
    this.handleMediaQueryChange()
    this.mediaQueryList.addEventListener('change', this.handleMediaQueryChange.bind(this))

    //? alternate way of doing this ?//
    // this.mediaQueryList.addEventListener('change', () => {
    //   this.handleMediaQueryChange()
    // })

  }

  logout() {
    this._authser.logout()
  }

  handleMediaQueryChange() {

    if (this.mediaQueryList.matches) {
      this.cartSmall = true
    }
    else {
      this.cartSmall = false
    }

  }

}



