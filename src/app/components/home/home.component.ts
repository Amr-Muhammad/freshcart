import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category, productsInterface } from 'src/app/interfaces/products';
import { HomeProductsService } from 'src/app/services/home-products.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { BehaviorSubject } from 'rxjs';
import { __values } from 'tslib';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {


  products: productsInterface[] = []
  categories: Category[] = []
  searchValue: string = ''

  searchhInput: BehaviorSubject<string> = new BehaviorSubject('')
  container: any
  elementTag: any
  public value: any
  constructor(private _homeProducts: HomeProductsService, private _router: Router) {

  }

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
        items: 6
      }
    },
  }
}