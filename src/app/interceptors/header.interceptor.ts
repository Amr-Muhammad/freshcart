import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class headerInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let token = localStorage.getItem('token')
    let modifiedReq: any
    if (token) {


      modifiedReq = req.clone({
        headers: req.headers.set('token', token)
      });
    }

    return next.handle(modifiedReq);
  }

}
