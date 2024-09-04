import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AsyncPipe, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

import { AuthService } from '../../shared/services/auth.service';
import { UserData } from '../../shared/models/userData.model';
import { AuthFormComponent } from '../../components/auth-form/auth-form.component';
import { LoadingService } from '../../shared/services/loading.service';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ProfileContentComponent } from '../../components/profile-content/profile-content.component';
import { LoadingDirective } from '../../shared/directives/loading.directive';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AuthFormComponent,
    NgIf,
    LoaderComponent,
    MatCardModule,
    AsyncPipe,
    ProfileContentComponent,
    ProfileContentComponent,
    LoadingDirective,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private loadingService = inject(LoadingService);

  user!: UserData;
  isShow: boolean = false;
  isUpdate: boolean = false;
  userFormGroup!: FormGroup;
  isLoading$!: Observable<boolean>;
  user$: Observable<UserData | null>;
  readonly formTitle: string = 'Редагувати профіль';

  constructor() {
    this.isLoading$ = this.loadingService.isLoading();
    this.userFormGroup = this.fb.group({
      email: [''],
      name: [''],
      password: [''],
    });
    this.user$ = this.authService.user$;
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

  onToggleUpdateInfo(user?: UserData) {
    this.isUpdate = !this.isUpdate;
    if (this.isUpdate && user) {
      this.userFormGroup.setValue({
        email: user.email || '',
        name: user.name,
        password: user.password,
      });
    }
  }
  onShowPassword() {
    this.isShow = !this.isShow;
  }
}
