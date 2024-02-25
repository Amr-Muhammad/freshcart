import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CartService {

  baseUrl: string = 'https://ecommerce.routemisr.com'
  header: any = localStorage.getItem('token')
  noOfCartItems: BehaviorSubject<number> = new BehaviorSubject(0)
  cartNotMessage: BehaviorSubject<boolean> = new BehaviorSubject(false)
  wishlistNotificationMessage: BehaviorSubject<boolean> = new BehaviorSubject(false)

  // options: any = {
  //   headers: {
  //     token: localStorage.getItem('token')
  //   }
  // }

  constructor(private _httpClient: HttpClient) {}

  addToCart(id: any): Observable<any> {
    let body = {
      productId: id
    }
    return this._httpClient.post(`${this.baseUrl}/api/v1/cart`, body)
  }

  getAllCart(): Observable<any> {
    return this._httpClient.get(`${this.baseUrl}/api/v1/cart`)
  }

  updateCartNumber(id: any, count: any): Observable<any> {
    let body = {
      count: count
    }
    return this._httpClient.put(`${this.baseUrl}/api/v1/cart/${id}`, body)
  }

  deleteCartItem(id: string): Observable<any> {
    return this._httpClient.delete(`${this.baseUrl}/api/v1/cart/${id}`)
  }

  clearCart(): Observable<any> {
    return this._httpClient.delete(`${this.baseUrl}/api/v1/cart`)
  }

  checkoutCash(id: string, cartForm: FormGroup): Observable<any> {
    let body = {
      shippingAddress: {
        cartForm
      }
    }
    return this._httpClient.post(`${this.baseUrl}/api/v1/orders/${id}`, body)
  }

  checkoutOnline(id: string, shippingAddress: FormGroup): Observable<any> {
    let body = {
      shippingAddress
    }

    return this._httpClient.post(`${this.baseUrl}/api/v1/orders/checkout-session/${id}?url=https://amr-muhammad.github.io/freshcart/`, body)
  }

}
