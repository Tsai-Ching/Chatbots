import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  // if (authService.isLoggedIn()) {
  //   console.log('isLoggedIn');

  //   return true;
  // }
  router.navigate(['/auth/login']);
  return false;
};
