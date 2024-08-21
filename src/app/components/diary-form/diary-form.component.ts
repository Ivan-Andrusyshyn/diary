import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';

import {
  DiaryContentArray,
  ResponsedDiaryPost,
} from '../../shared/models/diary';
import { ButtonWithLoaderComponent } from '../button-with-loader/button-with-loader.component';

@Component({
  selector: 'app-diary-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonWithLoaderComponent,
    NgIf,
    MatButtonModule,
  ],
  templateUrl: './diary-form.component.html',
  styleUrl: './diary-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiaryFormComponent implements OnInit {
  @Input() formGroup!: FormGroup;
  @Input() currentImage!: DiaryContentArray | ResponsedDiaryPost;

  @Output() onSubmit = new EventEmitter();
  @Output() hideUpdateForm = new EventEmitter();

  route = inject(ActivatedRoute);

  buttonType: string = 'submit';
  title: string = 'Додати';
  isDiaryRoute: boolean = false;

  ngOnInit(): void {
    this.route.url.pipe(take(1)).subscribe((param) => {
      this.isDiaryRoute = param.some((segment) => segment.path === 'diary');
    });
  }

  onSubmitForm() {
    this.onSubmit.emit(this.formGroup.value);
  }
  onUpdatePost() {
    this.hideUpdateForm.emit();
  }
}
