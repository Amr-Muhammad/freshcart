import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { allCart } from 'src/app/interfaces/allCart';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  @ViewChild('inputElement', { static: false }) inputElement?: ElementRef

  input: boolean = false
  cartData: allCart | null = null
  count: any
  noOfCartItems: number = 0

  constructor(private _cartService: CartService) {
  }

  ngOnInit(): void {

    // if (this._cartService.noOfCartItems.getValue() != 0) {

    this._cartService.getAllCart().subscribe({

      next: (response) => {
        this.cartData = response

      }
      ,
      error: (err) => {
        console.log(err);
      }
    })



  }
  // }

  updateCartNumber(id: string) {
    this.count = this.inputElement?.nativeElement.value
    this._cartService.updateCartNumber(id, this.count).subscribe({
      next: (response: allCart) => {

        this.cartData = response
        this.input = false

      }, error(err) {
        console.log(err);

      },
    })
  }

  deleteCartItem(id: string, e: any) {

    (e.target as HTMLElement).innerText = ' Deleting Item...';

    this._cartService.deleteCartItem(id).subscribe({
      next: (response: allCart) => {
        this.cartData = response;

        (e.target as HTMLElement).innerText = ' Delete Item';
        this._cartService.noOfCartItems.next(response.numOfCartItems)
        if (this._cartService.noOfCartItems.getValue() == 0) {
          this.cartData = null
          this.clearCart()
        }
      }
      ,
      error(err) {
        console.log(err);

      },
    })

  }

  changeQuantityManual(id: any, e: any) {

    let newQuantity = (e.target?.options as HTMLOptionsCollection).item(e.target.selectedIndex)?.value

    // if ((e.target.options as HTMLOptionsCollection).item(e.target.selectedIndex)?.value != 'change') {

    this._cartService.updateCartNumber(id, newQuantity).subscribe({
      next: (response: allCart) => {
        console.log(response);

        this.cartData = response;

      }, error(err) {
        console.log(err);

      },
    })

    // }
  }

  clearCart() {
    this._cartService.clearCart().subscribe({
      next: (respone) => {
        this.cartData = null
        this._cartService.noOfCartItems.next(0)
      }
      ,
      error(err) {
        console.log(err);
      },
    })
  }


}


