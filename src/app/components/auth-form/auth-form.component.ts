import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    NgIf,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.scss',
})
export class AuthFormComponent {
  @Input() formGroup!: FormGroup;
  @Input() titleName: string = 'Sign-in';
  @Input() errorMessage: string = '';
  @Output() onSubmitForm = new EventEmitter();

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
