import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const token = authService.getAuthToken();

  if (token && token.trim()) {
    return true;
  } else {
    router.navigate(['sign-in']);
    return false;
  }
};
