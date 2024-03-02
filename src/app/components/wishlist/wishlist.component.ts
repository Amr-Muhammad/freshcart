import { Component, OnInit } from '@angular/core';
import { allWishlist } from 'src/app/interfaces/all-wishlsit';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  wishlistData: allWishlist | null = null

  constructor(private _WishlistService: WishlistService, private _cartService: CartService) { }

  ngOnInit(): void {

    this._WishlistService.getAllWishlist().subscribe({
      next: (response) => {
        this.wishlistData = response
      }
      ,
      error: (err) => {
        console.log(err);
      }
    })
  }

  deleteWihslistItem(id: string) {
    this._WishlistService.deleteWishlistItem(id).subscribe({
      next: (response) => {
        if (this.wishlistData?.data) {
          this.wishlistData.data = this.wishlistData?.data.filter(obj => obj._id != id)
        }

        //!change this shit with array method
        // this._WishlistService.getAllWishlist().subscribe({
        //   next: (response) => {
        //     console.log(response);

        //     this.wishlistData = response

        //   }
        //   ,
        //   error: (err) => {
        //     console.log(err);

        //   }
        // })
      }
      ,
      error: (err) => {
        console.log(err);
      }
    })
  }

  addToCart(id: string, e: any) {
    e.target.innerText = 'Adding...'

    this._cartService.addToCart(id).subscribe({
      next: (response) => {
        this._cartService.cartNotMessage.next(true)
        this._cartService.noOfCartItems.next(response.numOfCartItems)
      },
      error: (err) => {
        console.log(err);
      },
      complete: () =>
        e.target.innerText = 'Add To Cart'
    })
  }


}
