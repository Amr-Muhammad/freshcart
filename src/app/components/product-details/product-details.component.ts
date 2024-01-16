import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { productDetailsInterface } from 'src/app/interfaces/productdetails';
import { HomeProductsService } from 'src/app/services/home-products.service';
import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})

export class ProductDetailsComponent implements OnInit {

  routeParameter: any
  id: any
  productDetails: productDetailsInterface | null = null

  constructor(private _ActivatedRoute: ActivatedRoute, private _HomeProductsService: HomeProductsService) {

  }



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

}
