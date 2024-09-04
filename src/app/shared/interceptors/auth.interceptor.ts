import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  const authToken = authService.getAuthToken();
  const isLoggedIn = authService.isLoggedIn$;

  let newReq;
  if (authToken && isLoggedIn) {
    newReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return next(newReq);
  } else {
    newReq = req.clone({
      setHeaders: {},
    });
    authService.logout();
    return next(newReq);
  }
};
