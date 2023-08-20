import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenModel } from 'src/app/Model/token-api.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURL:string = 'https://localhost:7166/api/User/'
  userPayLoad: any;
  constructor(private http: HttpClient) {
    this.userPayLoad = this.decodedToken();
   }

   singUp(userObj:any)
   {
     return this.http.post<any>(`${this.baseURL}Registration`, userObj);
   }

   login(userObj:any)
   {
     return this.http.post<any>(`${this.baseURL}Authentication`, userObj);
   }

   setToken (tokenValue:string)
   {
      localStorage.setItem('token', tokenValue);
   }

   setRefreshToken (tokenValue:string)
   {
      localStorage.setItem('refreshToken', tokenValue);
   }

   getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

   getToken() {
    return localStorage.getItem('token');
  }

   isLoggedIn(): boolean{
    return !!localStorage.getItem('token');
  }

  logOut()
  {
    localStorage.clear();
  }

  decodedToken()
  {
    const jwtHelperService = new JwtHelperService();
    const token = this.getToken()!; //! it may null 
    console.log(token, "Decoded token")
    return jwtHelperService.decodeToken(token);
  }

  renewedToken(tokenModel:TokenModel)
  {
    return this.http.post<any>(`${this.baseURL}refresh`, tokenModel);
  }


}
