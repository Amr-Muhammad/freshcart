import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { allCart } from 'src/app/interfaces/allCart';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, AfterViewChecked {

  @ViewChild('dropDown', { static: false }) dropDown?: ElementRef
  @ViewChild('inputElement', { static: false }) inputElement?: ElementRef

  input: boolean = false
  cartData: allCart | null = null
  count: any
  totalPrice: any

  constructor(private _cartService: CartService) {

  }

  ngOnInit(): void {

    this._cartService.getAllCart().subscribe({
      next: (response) => {
        this.cartData = response
        console.log(this.cartData);
        this.totalPrice = response.data.totalCartPrice

      },
      error: (err) => {
        console.log(err);

      }
    })
  }

  ngAfterViewChecked(): void {

    this.dropDown?.nativeElement.addEventListener('change', () => {
      if (this.dropDown?.nativeElement.value == 'change') {
        this.input = true
      }
    })

  }

  updateCartNumber(id: string) {
    this.count = this.inputElement?.nativeElement.value
    this._cartService.updateCartNumber(id, this.count).subscribe({
      next: (response: allCart) => {
        console.log(response);

        this.cartData = response
        this.input = false
        this.totalPrice = response.data.totalCartPrice

      }, error(err) {
        console.log(err);

      },
    })
  }

  deleteCartItem(id: string) {
    this._cartService.deleteCartItem(id).subscribe({
      next: (response) => {
        this.cartData = response
        this.totalPrice = response.data.totalCartPrice

      }, error(err) {
        console.log(err);

      },
    })
  }

}


