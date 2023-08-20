import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // need to declare a subject beahviour
  private fullName$ = new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");

  constructor() { }


 //After calling set method user will call get method to show their value
  getFullNameFromTokenStore()
  {
    return this.fullName$.asObservable();
  }

  //when ever user class this method to set full name
  setFullNameFromTokenStore(fullName:string)
  {
    this.fullName$.next(fullName);
  }

  getRoleNameFromTokenStore()
  {
    return this.role$.asObservable();
  }

  setRoleFromTokenStore(role:string)
  {
    this.role$.next(role);
  }
}
