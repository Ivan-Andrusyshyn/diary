import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterOutlet } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthService } from './shared/services/auth.service';
const privateRoutes: string[] = [
  '/profile',
  '/diary/create-post',
  '/success-diary',
  '/diary-posts',
];
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    this.authService.checkIsLogged();

    this.authService.isLoggedIn$
      .pipe(takeUntilDestroyed())
      .subscribe((isLoggedIn) => {
        const currentRoute = location.pathname;

        if (isLoggedIn && !privateRoutes.includes(currentRoute)) {
          this.router.navigate(['/profile']);
        }
      });
  }
}
