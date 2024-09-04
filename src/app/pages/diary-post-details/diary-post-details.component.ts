import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { filter, map, Observable, Subject, switchMap, take, tap } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ResponseDiaryPost } from '../../shared/models/diary';
import { DiaryPostService } from '../../shared/services/diaryPost.service';
import { DiaryFormComponent } from '../../components/diary-form/diary-form.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-diary-post-details',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    DiaryFormComponent,
    MatButtonModule,
    DiaryFormComponent,
    AsyncPipe,
  ],
  templateUrl: './diary-post-details.component.html',
  styleUrl: './diary-post-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiaryPostDetailsComponent {
  private route = inject(ActivatedRoute);
  private diaryPostsService = inject(DiaryPostService);
  private fb = inject(FormBuilder);
  private dialog = inject(MatDialog);
  private cd = inject(ChangeDetectorRef);

  diaryFormGroup: FormGroup;
  isUpdate: boolean = false;
  isMobile: boolean = false;
  diaryPost: Observable<any> = new Subject();
  postDetails: ResponseDiaryPost | null = null;

  constructor() {
    this.diaryFormGroup = this.fb.group({
      userDescribe: ['', Validators.required],
    });
    this.diaryPost = this.route.params.pipe(
      switchMap((params: any) => {
        const noteId = params['id'];
        return this.diaryPostsService.diaryPosts.pipe(
          filter((posts) => !!posts.length),
          map((posts) => posts.find((entry) => entry._id === noteId)),
          tap((post) => {
            if (post) {
              this.diaryFormGroup.setValue({
                userDescribe: post.userDescribe || '',
              });
            }
          })
        );
      })
    );
  }

  onUpdatePost(postDetails?: ResponseDiaryPost) {
    this.isUpdate = !this.isUpdate;
    if (this.isUpdate && postDetails) {
      this.postDetails = postDetails;
    }
  }
  onDeletePost() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { title: 'Видалити', confirm: true },
    });

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((result) => {
        if (result && this.postDetails) {
          this.diaryPostsService.deletePost(this.postDetails._id);
        }
      });
  }
  onSubmitForm() {
    if (this.diaryFormGroup.valid && this.postDetails) {
      this.postDetails.userDescribe = this.diaryFormGroup.value.userDescribe;
      this.diaryPostsService.updateDiaryPost(this.postDetails);
    } else {
      console.log('Something wrang');
    }
  }
}
