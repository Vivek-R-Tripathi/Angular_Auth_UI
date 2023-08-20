import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from 'src/services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { TokenModel } from '../Model/token-api.model';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService, private toast: NgToastService, private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    //setting token
   // console.log(this.auth.getToken(), "from intercepter")
    const myToken = this.auth.getToken();
   // console.log(myToken, "My token");
    // modify token
    if (myToken) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${myToken}` } // "Bearer "+myToken
      })
    }

    // call the next method
    return next.handle(request).pipe(catchError((err: any) => {

      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          // this.toast.warning({ detail: 'Warning', summary: 'Please login again as token got expired!!' });
          // this.router.navigate(['login']);
        return this.handleUnAuthorizedError(request,next)
        }

      }
      return throwError(() => new Error("Some other error occured"));
    }));
  }
  // call this method if error 401 occur
  handleUnAuthorizedError(req: HttpRequest<any>, next:HttpHandler)
  {
    let tokenApi = new TokenModel();
    tokenApi.accessToken =this.auth.getToken()!;
    tokenApi.refreshToken = this.auth.getRefreshToken()!;
    return this.auth.renewedToken(tokenApi).pipe(
      switchMap((data:TokenModel)=>{
        this.auth.setToken(data.accessToken);
        this.auth.setRefreshToken(data.refreshToken);
          req = req.clone({
          setHeaders: { Authorization: `Bearer ${data.accessToken}` } // "Bearer "+myToken
        })
         return next.handle(req);
      }),
      catchError((err)=>{
        return throwError(()=>{
           this.toast.warning({ detail: 'Warning', summary: 'Please login again as token got expired!!' });
           this.router.navigate(['login']);
        })
      })
    )

  }
}
