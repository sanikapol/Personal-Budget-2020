
import { Injectable } from '@angular/core';
import { HttpEvent,HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { TokenService } from '../services/token.service';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { UserService } from '../services/user.service';

@Injectable({
    providedIn: 'root'
})
export class HttpConfigInterceptor implements HttpInterceptor {
    constructor(private tokenService:TokenService,private userService:UserService) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const token = this.tokenService.getToken();
      const refreshToken = this.tokenService.getRefreshToken();

      if(token){
        const authReq = req.clone({
          headers: req.headers.set('Authorization', token)
        });
        return next.handle(authReq).pipe(
          map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                console.log('event--->>>', event);
            }
            return event;
        }),
        catchError((error: HttpErrorResponse) => {
            if(error.status == 401){
                this.userService.refreshToken();
            }
            return throwError(error);
        }));



      }

      try {
        return next.handle(req);
      } catch (error) {
        console.log("in interceptior")
        console.log(error);
      }



        // // Get the auth token from  localstorage.
        // const authToken = localStorage.getItem('Token');

        // //console.log("interceptor: " + authToken);
        // // Clone the request and replace the original headers with
        // // cloned headers, updated with the authorization.

        // if(authToken){
        //   const authReq = req.clone({
        //       headers: req.headers.set('Authorization', authToken)
        //   });
        //   // send cloned request with header to the next handler.
        //   return next.handle(authReq);
        // }
        // return next.handle(req);

    }
}
