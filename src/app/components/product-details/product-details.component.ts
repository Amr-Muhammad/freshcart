import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { productDetailsInterface } from 'src/app/interfaces/productdetails';
import { HomeProductsService } from 'src/app/services/home-products.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/services/cart.service';
import { allCart } from 'src/app/interfaces/allCart';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})

export class ProductDetailsComponent implements OnInit {

  routeParameter: any
  id: any
  productDetails: productDetailsInterface | null = null

  constructor(private _ActivatedRoute: ActivatedRoute, private _HomeProductsService: HomeProductsService, private _cartSeervice: CartService) { }

  ngOnInit(): void {
    this._ActivatedRoute.params.subscribe((parameter) => {

      this._HomeProductsService.getProductsDetails(parameter['id']).subscribe((data) => {
        this.productDetails = data.data

      })

    })

    //*Alterante way of getting parameters bdl el subscribe */
    // this.id = this._ActivatedRoute.params
    // console.log(this.id._value); 
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    // animateOut: 'ease',
    // autoplay: true,
    // autoplayTimeout: 1000,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
    },
    nav: false
  }

  addToCart() {

    this._ActivatedRoute.params.subscribe((change) => [
      this.id = change['id']
    ]);

    (document.querySelector('#addToCartBtn') as HTMLElement).innerText = 'Adding...'

    this._cartSeervice.addToCart(this.id).subscribe({
      next: (response: allCart) => {
        this._cartSeervice.noOfCartItems.next(response.numOfCartItems)
        this._cartSeervice.isAddedToCart.next(true)
      }
      ,
      error: (error) => {
        console.log(error);

      }
      ,
      complete: () => {
        (document.querySelector('#addToCartBtn') as HTMLElement).innerText = 'Add To Cart'

      }
    })
  }

}
