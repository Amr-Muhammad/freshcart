import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  baseUrl: string = 'https://ecommerce.routemisr.com'
  header: any = localStorage.getItem('token')
  noOfCartItems: BehaviorSubject<number> = new BehaviorSubject(0)

  options: any = {
    headers: {
      token: localStorage.getItem('token')
    }
  }

  constructor(private _httpClient: HttpClient) {
  }


  addToCart(id: any): Observable<any> {
    let body = {
      productId: id
    }
    return this._httpClient.post(`${this.baseUrl}/api/v1/cart`, body, this.options)
  }

  getAllCart(): Observable<any> {
    return this._httpClient.get(`${this.baseUrl}/api/v1/cart`, this.options)
  }

  updateCartNumber(id: any, count: any): Observable<any> {
    let body = {
      count: count
    }
    return this._httpClient.put(`${this.baseUrl}/api/v1/cart/${id}`, body, this.options)
  }

  deleteCartItem(id: string): Observable<any> {
    return this._httpClient.delete(`${this.baseUrl}/api/v1/cart/${id}`, this.options)
  }

  clearCart(): Observable<any> {
    return this._httpClient.delete(`${this.baseUrl}/api/v1/cart`, this.options)
  }

}
