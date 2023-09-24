import { Injectable } from "@angular/core";
import { HttpHandler, HttpInterceptor, HttpEvent, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modified = req.clone({setHeaders: {'Authorization': 'accessToken12414512'}});
    return next.handle(modified);
  }
}
