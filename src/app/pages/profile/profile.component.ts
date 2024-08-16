import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../shared/services/auth.service';
import { UserData } from '../../shared/models/userData.model';
import { DiaryStepperComponent } from '../../components/diary-stepper/diary-stepper.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatButtonModule, DiaryStepperComponent, MatCardModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
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
