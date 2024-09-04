import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AuthService } from '../../shared/services/auth.service';
import { UserData } from '../../shared/models/userData.model';

import { DiaryPostService } from '../../shared/services/diaryPost.service';
import { LoaderComponent } from '../loader/loader.component';
import {
  HeaderLinksModel,
  HeaderPrivateLinks,
  HeaderPublicLinks,
} from '../../shared/constants/routeLinks/header-links';
import { HeaderLinkListComponent } from '../header-link-list/header-link-list.component';

type HeaderLinks = {
  public: HeaderLinksModel[];
  private: HeaderLinksModel[];
};

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    NgIf,
    AsyncPipe,
    LoaderComponent,
    HeaderLinkListComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private authService = inject(AuthService);
  private diaryService = inject(DiaryPostService);

  user$!: Observable<UserData | null>;
  isLoggedIn$!: Observable<boolean>;
  headerLinks: HeaderLinks = {
    public: HeaderPublicLinks,
    private: HeaderPrivateLinks,
  };

  constructor() {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.user$ = this.authService.user$;
  }

  onLogout() {
    this.diaryService.cleanAllDiaryInfoOnClient();
    this.authService.logout();
  }
}
