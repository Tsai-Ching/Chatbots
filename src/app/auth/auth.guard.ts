import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const  authService  =  inject(AuthService);
  const  router  =  inject(Router);
console.log(authService.isLoggedIn());

  if (authService.isLoggedIn()) {
    console.log('isLoggedIn');

    return true;
  }
  router.navigate(['/login']);
  return false;
};
