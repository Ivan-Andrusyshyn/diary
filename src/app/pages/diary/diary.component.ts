import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { Observable } from 'rxjs';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { catContentArray, dogContentArray } from '../diary/contentArray';
import {
  DiaryContentArray,
  DiaryPost,
  ResponseDiaryPost,
} from '../../shared/models/diary';
import { DiaryPostService } from '../../shared/services/diaryPost.service';
import { DiaryFormComponent } from '../../components/diary-form/diary-form.component';
import { DiaryGalleryComponent } from '../../components/diary-gallery/diary-gallery.component';

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
    DiaryGalleryComponent,
    MatInputModule,
  ],

  templateUrl: './diary.component.html',
  styleUrl: './diary.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiaryComponent {
  @ViewChild('scrollTarget') scrollEll!: ElementRef;

  private fb = inject(FormBuilder);
  private diaryPostServices = inject(DiaryPostService);
  diaryFormGroup!: FormGroup;

  catsGallery: DiaryContentArray[] = catContentArray;
  dogsGallery: DiaryContentArray[] = dogContentArray;
  currentImage: DiaryContentArray = this.catsGallery[0];
  firstFormGroup!: FormGroup;
  isLinear: boolean = false;

  screenWidth = window.innerWidth;
  errorMessage: string = 'Напишіть кілька слів про свій день.';

  constructor() {
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
  onChooseImage(value: DiaryContentArray) {
    this.currentImage = value;
    if (this.scrollEll && this.scrollEll.nativeElement) {
      this.scrollEll.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    } else {
      console.log('scroll element is not exist.');
    }
  }
}
