import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { UserData } from '../../shared/models/userData.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorSubject, Observable } from 'rxjs';

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
})
export class HeaderComponent implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);
  user!: UserData | null;
  isLoggedIn$!: Observable<boolean>;

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn$.asObservable();

    this.authService.user$.subscribe((resp) => {
      if (resp) {
        this.user = { ...resp };
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
