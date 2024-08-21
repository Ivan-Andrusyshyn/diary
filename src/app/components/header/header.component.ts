import { AsyncPipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { UserData } from '../../shared/models/userData.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorSubject, Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    MatIconModule,
    RouterLinkActive,
    AsyncPipe,
    NgIf,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  authService = inject(AuthService);
  router = inject(Router);
  user!: UserData | null;
  isLoggedIn$!: Observable<boolean>;
  private cd = inject(ChangeDetectorRef);

  constructor() {
    this.isLoggedIn$ = this.authService.getIsLoggedIn().asObservable();

    this.authService.user$.pipe(takeUntilDestroyed()).subscribe((resp) => {
      if (resp) {
        this.user = { ...resp };
        this.cd.markForCheck();
      } else {
        console.log('User data is no exist.');
      }
    });
  }

  onLogout() {
    this.authService.logout();
    this.user = null;
    this.router.navigate(['']);
  }
}
