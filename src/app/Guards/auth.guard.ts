import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/services/auth.service';

export const authGuard: CanActivateFn = (route, state) => { 

  const authService =  inject(AuthService);
  const routes = inject(Router);
  const toastMessage = inject(NgToastService);

  if(authService.isLoggedIn())
  {
    return true;
  }
  else{
    routes.navigate(['login']);
    toastMessage.error({detail:'Error', summary:"Please login first", duration:5000});
    return false;
  }

}
