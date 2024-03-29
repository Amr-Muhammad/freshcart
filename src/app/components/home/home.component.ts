import { Component, OnInit } from '@angular/core';
import { Category, productsInterface } from 'src/app/interfaces/products';
import { HomeProductsService } from 'src/app/services/home-products.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/services/cart.service';
import { addCart } from 'src/app/interfaces/addCart';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {

  products: productsInterface[] = []
  categories: Category[] = []
  searchValue: string = ''

  constructor(private _homeProducts: HomeProductsService, private _cartService: CartService, private _WishlistService: WishlistService) { }

  ngOnInit(): void {

    this._homeProducts.getProducts().subscribe({
      next: (response: any) => {
        this.products = response.data

      }
    })


    this._homeProducts.getCategories().subscribe({
      next: (response) => {
        this.categories = response.data
      }
    })


  }

  addToCart(id: string, e: Event) {
    (e.target as HTMLElement).innerText = 'Adding...'

    this._cartService.addToCart(id).subscribe({

      next: (response: addCart) => {
        this._cartService.noOfCartItems.next(response.numOfCartItems);
        this._cartService.cartNotMessage.next(true)
      }
      ,
      error: (error) => {
        console.log(error);
      }
      ,
      complete() {
        (e.target as HTMLElement).innerText = 'Add to Cart';
        //   (document.getElementById(id) as HTMLElement).classList.add('translate')

        //   setTimeout(() => {
        //     (document.getElementById(id) as HTMLElement).classList.remove('translate')
        //   }, 1500);

      },
    })

  }

  addToWishlist(productId: string) {
    this._WishlistService.addToWishlist(productId).subscribe({
      next: () => {
        this._cartService.wishlistNotificationMessage.next(true)
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  focusInput(e: any) {
    (document.querySelector('.searchInput') as HTMLInputElement).focus()
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    autoplay: true,
    autoplaySpeed: 1000,
    autoplayTimeout: 3000,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    }
  }

  customOptions2: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    nav: true,
    autoplay: true,
    margin: 10,
    autoplaySpeed: 1000,
    autoplayTimeout: 3000,
    navText: ['<i class="fa-solid fa-arrow-left"></i>', '<i class="fa-solid fa-arrow-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      350: {
        items: 3
      },
      500: {
        items: 4
      },
      740: {
        items: 5
      },
      940: {
        items: 7
      }
    },
  }

}