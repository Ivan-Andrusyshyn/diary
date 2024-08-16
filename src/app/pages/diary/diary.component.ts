import { AsyncPipe, DatePipe, NgFor } from '@angular/common';
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
@Component({
  selector: 'app-diary',
  standalone: true,
  imports: [
    NgFor,
    AsyncPipe,
    DatePipe,
    MatTabsModule,
    ReactiveFormsModule,
    DiaryFormComponent,
  ],

  templateUrl: './diary.component.html',
  styleUrl: './diary.component.scss',
})
export class DiaryComponent {
  private fb = inject(FormBuilder);
  private diaryPostServices = inject(DiaryPostService);

  diaryFormGroup!: FormGroup;

  catsImgs: DiaryContentArray[] = catContentArray;
  dogsImgs: DiaryContentArray[] = dogContentArray;
  currentImage: DiaryContentArray = this.catsImgs[0];
  diaryPosts: Observable<ResponsedDiaryPost[]>;

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
    } else {
      console.log('Form is not valid!');
    }
  }
  onChooseImage(value: DiaryContentArray, scrollTarget: HTMLElement) {
    this.currentImage = value;
    scrollTarget.scrollIntoView({ behavior: 'smooth' });
  }
}
