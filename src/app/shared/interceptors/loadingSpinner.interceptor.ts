import { finalize } from 'rxjs';
import { HttpInterceptorFn } from '@angular/common/http';

import { LoadingService } from '../services/loading.service';
import { inject } from '@angular/core';

export const loadingSpinnerInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  loadingService.showLoadingSpinner();

  return next(req).pipe(
    finalize(() => {
      loadingService.hideLoadingSpinner();
    })
  );
};
