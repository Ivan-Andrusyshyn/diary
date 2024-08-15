import { Routes } from '@angular/router';

import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { authGuard } from './shared/guards/auth.guard';
import { DiaryComponent } from './pages/diary/diary.component';
import { DiaryPostDetailsComponent } from './pages/diary-post-details/diary-post-details.component';
import { DiaryPostsComponent } from './pages/diary-posts/diary-posts.component';

export const routes: Routes = [
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SigninComponent },
  { path: 'sign-up', component: SignupComponent },
  {
    path: 'diary-posts',
    component: DiaryPostsComponent,
    children: [
      {
        path: ':id',
        component: DiaryPostDetailsComponent,
      },
    ],
    canActivate: [authGuard],
  },
  {
    path: 'diary-posts/mobile/:id',
    component: DiaryPostDetailsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'diary',
    component: DiaryComponent,
    canActivate: [authGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard],
  },

  { path: '**', pathMatch: 'full', component: NotFoundPageComponent },
];
