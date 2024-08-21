import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { AuthService } from '../../shared/services/auth.service';
import { UserData } from '../../shared/models/userData.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  authService = inject(AuthService);

  user!: UserData | null;
  isShow: boolean = false;

  ngOnInit(): void {
    this.authService.user$.subscribe((resp) => {
      if (resp) {
        this.user = { ...resp };
      }
    });
  }

  onShowPassword() {
    this.isShow = !this.isShow;
  }
}
