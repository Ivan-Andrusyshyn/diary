import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthFormComponent } from '../../components/auth-form/auth-form.component';
import { AuthService } from '../../shared/services/auth.service';
import { UserData } from '../../shared/models/userData.model';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [AuthFormComponent],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent {
  fb = inject(FormBuilder);

  private authService = inject(AuthService);

  signinForm: FormGroup;
  titleName: string = 'Sign-in';
  errorMessage: string = 'You need fill-up your email and password.';

  constructor() {
    this.signinForm = this.fb.group({
      email: ['s1@icloud.com', [Validators.required]],
      password: ['123456', [Validators.required]],
    });
  }

  onSignIn() {
    const userData: UserData = this.signinForm.value;
    if (userData) {
      this.authService.signIn(userData);
    } else {
      console.log('Something wrang in signin form.');
    }
  }
}
