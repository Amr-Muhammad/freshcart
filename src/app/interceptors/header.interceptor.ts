import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoadingScreenService } from '../services/loading-screen.service';

@Injectable()
export class headerInterceptor implements HttpInterceptor {

  constructor(private _loading: LoadingScreenService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._loading.loadingScreen.next(true)

    if (req.url.includes('auth')) {
      return next.handle(req).pipe(
        finalize(() => {
          this._loading.loadingScreen.next(false)
        })
      )
    }

    else {
      let token = localStorage.getItem('token')
      let modifiedReq: any

      if (token) {
        modifiedReq = req.clone({
          headers: req.headers.set('token', token)
        });
        return next.handle(modifiedReq).pipe(
          finalize(() => {
            this._loading.loadingScreen.next(false)

          })
        )
      }
      else {
        return next.handle(req).pipe(
          finalize(() => {
            this._loading.loadingScreen.next(false)
          })
        )
      }

    }

  }
}
