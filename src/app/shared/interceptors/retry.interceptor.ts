import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, retry, throwError } from 'rxjs';

export const retryInterceptor: HttpInterceptorFn = (req, next) => {
  const maxRetries = 2;

  return next(req).pipe(
    retry(maxRetries),
    catchError((error: HttpErrorResponse) => {
      console.error('Retry Interceptor Functional Error:', error);
      return throwError(() => error);
    })
  );
};
