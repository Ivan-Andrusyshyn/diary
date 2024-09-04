import { AsyncPipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { map, Observable } from 'rxjs';
import { MatInputModule } from '@angular/material/input';

import { LoadingService } from '../../shared/services/loading.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormLoaderComponent } from '../form-loader/form-loader.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    NgIf,
    AsyncPipe,
    MatFormFieldModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    FormLoaderComponent,
    FormLoaderComponent,
  ],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthFormComponent implements OnInit {
  @Input() formGroup!: FormGroup;
  @Input() titleName: string = 'Увійти';
  @Input() errorMessage: string = '';
  @Output() onSubmitForm = new EventEmitter();
  private loadingService = inject(LoadingService);
  private router = inject(Router);

  loading$!: Observable<boolean>;
  currentRoute!: string;
  authPage: string[] = ['/sign-in', '/sign-up'];

  ngOnInit(): void {
    this.currentRoute = this.router.url;
    this.loading$ = this.loadingService.isLoading();
  }
  onSubmit() {
    if (this.formGroup.valid) {
      this.onSubmitForm.emit();
    } else {
      this.formGroup.setErrors(Validators.required);
    }
  }

  isAuthPage(url: string): string {
    return this.authPage.includes(url) ? 'Увійти' : 'Редагувати';
  }
}
