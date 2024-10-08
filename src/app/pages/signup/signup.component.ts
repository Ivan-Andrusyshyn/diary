import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthFormComponent } from '../../components/auth-form/auth-form.component';
import { AuthService } from '../../shared/services/auth.service';
import { UserData } from '../../shared/models/userData.model';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [AuthFormComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent {
  private fb = inject(FormBuilder);

  private authService = inject(AuthService);

  signupForm: FormGroup;
  titleName: string = 'Реєстрація';
  errorMessage: string = 'You need fill-up your name, email and password.';

  constructor() {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(14)]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.maxLength(10)]],
    });
  }

  onSignUp() {
    const userData: UserData = this.signupForm.value;
    if (userData) {
      this.authService.signUp(userData);
    } else {
      console.log('The userData is no exist.');
    }
  }
}
