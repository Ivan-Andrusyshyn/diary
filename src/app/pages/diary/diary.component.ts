import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';

import { catContentArray, dogContentArray } from '../diary/contentArray';
import {
  DiaryContentArray,
  DiaryPost,
  ResponsedDiaryPost,
} from '../../shared/models/diary';
import { DiaryPostService } from '../../shared/services/diaryPost.service';
import { Observable } from 'rxjs';
import { DiaryFormComponent } from '../../components/diary-form/diary-form.component';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { ButtonWithLoaderComponent } from '../../components/button-with-loader/button-with-loader.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-diary',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    AsyncPipe,
    DatePipe,
    MatTabsModule,
    ReactiveFormsModule,
    DiaryFormComponent,
    MatButtonModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    ButtonWithLoaderComponent,
  ],

  templateUrl: './diary.component.html',
  styleUrl: './diary.component.scss',
})
export class DiaryComponent {
  private fb = inject(FormBuilder);
  private diaryPostServices = inject(DiaryPostService);
  private router = inject(Router);
  diaryFormGroup!: FormGroup;

  catsImgs: DiaryContentArray[] = catContentArray;
  dogsImgs: DiaryContentArray[] = dogContentArray;
  currentImage: DiaryContentArray = this.catsImgs[0];
  diaryPosts: Observable<ResponsedDiaryPost[]>;
  firstFormGroup!: FormGroup;
  isLinear: boolean = false;

  screenWidth = window.innerWidth;
  errorMessage: string = ' Напишіть кілька слів про свій день.';
  constructor() {
    this.diaryPostServices.getDiaryPosts();
    this.diaryPosts = this.diaryPostServices.diaryPosts$;

    this.diaryFormGroup = this.fb.group({
      userDescribe: ['', Validators.required],
    });
  }
  onSubmitForm() {
    if (this.diaryFormGroup.valid) {
      const post: DiaryPost = {
        userDescribe: this.diaryFormGroup.value.userDescribe,
        imgUrl: this.currentImage.imgUrl,
        imgTitle: this.currentImage.imgTitle,
        imgAlt: this.currentImage.imgAlt,
      };
      this.diaryPostServices.createDiaryPost(post);

      this.diaryFormGroup.reset();
      this.router.navigate(['/diary-posts']);
    } else {
      this.router.navigate(['/diary-posts']);
      console.log('Form is not valid!');
    }
  }
  onChooseImage(value: DiaryContentArray) {
    this.currentImage = value;
  }
}
