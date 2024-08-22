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
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DiaryPostService } from '../../shared/services/diaryPost.service';

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
  private authService = inject(AuthService);
  private cd = inject(ChangeDetectorRef);
  private diaryService = inject(DiaryPostService);

  user!: UserData | null;
  isLoggedIn$!: Observable<boolean>;
  loading$!: Observable<boolean>;

  constructor() {
    this.isLoggedIn$ = this.authService.getIsLoggedIn();

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
    this.diaryService.cleanAllDiaryInfoOnClient();
    this.authService.logout();
    this.user = null;
  }
}
