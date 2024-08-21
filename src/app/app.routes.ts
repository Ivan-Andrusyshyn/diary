import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
  {
    path: 'sign-in',
    loadComponent: () =>
      import('./pages/signin/signin.component').then((m) => m.SigninComponent),
  },
  {
    path: 'sign-up',
    loadComponent: () =>
      import('./pages/signup/signup.component').then((m) => m.SignupComponent),
  },
  {
    path: 'diary-posts',
    loadComponent: () =>
      import('./pages/diary-posts/diary-posts.component').then(
        (m) => m.DiaryPostsComponent
      ),
    children: [
      {
        path: ':id',
        loadComponent: () =>
          import(
            './pages/diary-post-details/diary-post-details.component'
          ).then((m) => m.DiaryPostDetailsComponent),
      },
    ],
    canActivate: [authGuard],
  },
  {
    path: 'diary/create-post',
    loadComponent: () =>
      import('./pages/diary/diary.component').then((m) => m.DiaryComponent),
    canActivate: [authGuard],
  },

  {
    path: 'success-diary',
    loadComponent: () =>
      import('./pages/success-diary/success-diary.component').then(
        (m) => m.SuccessDiaryComponent
      ),

    canActivate: [authGuard],
  },

  {
    path: 'profile',
    loadComponent: () =>
      import('./pages/profile/profile.component').then(
        (m) => m.ProfileComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found-page/not-found-page.component').then(
        (m) => m.NotFoundPageComponent
      ),
  },
];
