import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  // static idToken = ''
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const idToken = localStorage.getItem('idToken')
    const req = request.clone({
      setHeaders:{Authorization: `Bearer ${idToken}`}
    })
    return next.handle(req);
  }
}
