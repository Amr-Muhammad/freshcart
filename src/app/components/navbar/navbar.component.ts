import { AfterContentChecked, AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
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
  isAddedToCart: boolean = false

  mediaQueryValue = window.matchMedia('(max-width:991px)')

  cartSmall: boolean = false
  cartBig: boolean = false

  constructor(private _authser: AuthenticationService, private _router: Router, private _cartService: CartService, private _Renderer2: Renderer2) {

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

    let handleMediaQueryChange = () => {
      if (this.mediaQueryValue.matches) {
        this.cartBig = false
        this.cartSmall = true
      }
      else {
        this.cartBig = true
        this.cartSmall = false
      }
    }

    handleMediaQueryChange()
    this.mediaQueryValue.addEventListener('change', handleMediaQueryChange)

  }



  logout() {
    this._authser.logout()
  }


  // handleMediaQueryChange() {
  //   console.log(this.mediaQueryValue);

  //   if (this.mediaQueryValue.matches) {
  //     this.cartBig = false
  //     this.cartSmall = true
  //   }
  //   else {
  //     this.cartBig = true
  //     this.cartSmall = false
  //   }
  // }
}



