import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AsyncPipe, NgIf } from '@angular/common';

import { Product } from '../../shared/models/productResponse.model';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AsyncPipe,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    NgIf,
    LoaderComponent,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  @Input() formGroup!: FormGroup<any>;
  @Input() errorMessage!: string;

  @Output() onSubmit = new EventEmitter<Product>();

  imagePreview: string | ArrayBuffer = '';

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      this.formGroup.patchValue({ image: file });
      this.formGroup.get('image')?.updateValueAndValidity();

      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };

      reader.readAsDataURL(file);
    }
  }
  get imgLoader() {
    return this.formGroup.get('image')?.value;
  }
  onSubmitForm() {
    if (this.formGroup.invalid) {
      console.log('Form is invalid');
      return;
    } else {
      const product = this.formGroup.value;

      this.onSubmit.emit(product);
      this.imagePreview = '';
    }
  }
}
