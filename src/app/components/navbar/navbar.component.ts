import { Component, OnInit } from '@angular/core';
import { addCart } from 'src/app/interfaces/addCart';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLogged: boolean = true
  noOfCartItems: number = 0
  isAddedToCart: boolean = false
  wishlistNotMessage: boolean = false

  mediaQueryList = window.matchMedia('(max-width:991px)')
  cartSmall: boolean = false

  constructor(private _authser: AuthenticationService, private _cartService: CartService) { }

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

    this._cartService.getAllCart().subscribe({
      next: (response: addCart) => {
        this.noOfCartItems = response.numOfCartItems
      }
      ,
      error: (err) => {
        console.log(err);
      },
    })

    this._cartService.noOfCartItems.subscribe((changeInNumber) => {
      this.noOfCartItems = changeInNumber
    })

    this._cartService.isAddedToCart.subscribe((newValue) => {
      this.isAddedToCart = newValue

      setTimeout(() => {
        this.isAddedToCart = false
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



