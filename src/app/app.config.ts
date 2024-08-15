import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { authInterceptor } from './shared/interceptors/auth.interceptor';
import { loadingSpinnerInterceptor } from './shared/interceptors/loadingSpinner.interceptor';
import { retryInterceptor } from './shared/interceptors/retry.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        authInterceptor,
        retryInterceptor,
        loadingSpinnerInterceptor,
      ])
    ),
    provideAnimationsAsync(),
  ],
};
