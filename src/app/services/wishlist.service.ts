import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  BaseUrl: string = 'https://ecommerce.routemisr.com'

  constructor(private _HttpClient: HttpClient) { }


  getAllWishlist(): Observable<any> {
    return this._HttpClient.get(`${this.BaseUrl}/api/v1/wishlist`)
  }

  addToWishlist(productId: string): Observable<any> {
    let body = {
      productId: productId
    }
    return this._HttpClient.post(`${this.BaseUrl}/api/v1/wishlist`, body)
  }

  deleteWishlistItem(id: string): Observable<any> {
    return this._HttpClient.delete(`${this.BaseUrl}/api/v1/wishlist/${id}`)
  }

}
