import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { AuthService } from '../../shared/services/auth.service';
import { UserData } from '../../shared/models/userData.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgIf } from '@angular/common';
import { AuthFormComponent } from '../../components/auth-form/auth-form.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MatButtonModule,
    ReactiveFormsModule,
    AuthFormComponent,
    NgIf,
    MatCardModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private cd = inject(ChangeDetectorRef);

  user!: UserData;
  isShow: boolean = false;
  isUpdate: boolean = false;
  userFormGroup!: FormGroup;

  constructor() {
    this.userFormGroup = this.fb.group({
      email: [''],
      name: [''],
      password: [''],
    });
    this.authService.user$.pipe(takeUntilDestroyed()).subscribe((response) => {
      if (response) {
        this.user = { ...response };
        this.userFormGroup.setValue({
          email: response.email || '',
          name: response.name,
          password: response.password,
        });
        this.cd.markForCheck();
      } else {
        console.log('no response');
      }
    });
  }
  onSubmitForm() {
    if (this.userFormGroup.valid) {
      this.authService.userUpdate(this.userFormGroup.value);
      this.isUpdate = false;
    } else {
      console.log('Value is not valid.');
      this.isUpdate = true;
    }
  }

  onToggleUpdateInfo() {
    this.isUpdate = !this.isUpdate;
  }
  onShowPassword() {
    this.isShow = !this.isShow;
  }
}
