
import { Injectable } from '@angular/core';
import { HttpEvent,HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
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
          //headers: req.headers.set('Authorization', token)
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'Authorization': token,
            'Content-Transfer-Encoding':'application/gzip'
          })
        });
        return next.handle(authReq).pipe(
          map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                //console.log('event--->>>', event);
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



    }
}
