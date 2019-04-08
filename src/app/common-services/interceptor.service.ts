import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from "@angular/common/http";
import { Observable } from "rxjs";
import { CookieService } from '../common-services/cookie.service';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private cs: CookieService) {
   }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const req = {
      setHeaders: {
        Authorization: `${this.cs.getItem("token")}`,
        'user': `${this.cs.getItem("user_id")}`
      }
    };
    if(request.url != `${environment.baseURL}fileUpload`) {
      req.setHeaders['Content-Type'] = 'application/json';
    }
    request = request.clone(req);
    return next.handle(request);
  }
}
