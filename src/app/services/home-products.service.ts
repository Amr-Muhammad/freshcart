import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeProductsService {

  baseUrl: string = 'https://ecommerce.routemisr.com'
  constructor(private _httpclient: HttpClient) {

  }

  getProducts() {
    return this._httpclient.get(`${this.baseUrl}/api/v1/products`)
  }


  getProductsDetails(id: any):Observable<any> {
    return this._httpclient.get(`${this.baseUrl}/api/v1/products/${id}`)
  }

  getCategories():Observable<any>{
    return this._httpclient.get(`${this.baseUrl}/api/v1/categories`)
  }
}
