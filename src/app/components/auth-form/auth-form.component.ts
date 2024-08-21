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
import { Observable } from 'rxjs';
import { MatInputModule } from '@angular/material/input';

import { LoadingService } from '../../shared/services/loading.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
  ],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthFormComponent implements OnInit {
  @Input() formGroup!: FormGroup;
  @Input() titleName: string = 'Sign-in';
  @Input() errorMessage: string = '';
  @Output() onSubmitForm = new EventEmitter();
  private loadingService = inject(LoadingService);

  loading$!: Observable<boolean>;

  ngOnInit(): void {
    this.loading$ = this.loadingService.isLoading();
  }
  onSubmit() {
    if (this.formGroup.valid) {
      this.onSubmitForm.emit();
      console.log('Submitted');
    } else {
      this.formGroup.setErrors(Validators.required);
      console.log('not submitted');
    }
  }
}
