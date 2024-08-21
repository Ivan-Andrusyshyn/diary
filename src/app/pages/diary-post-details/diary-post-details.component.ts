import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { filter, map, switchMap, take } from 'rxjs';
import { NgIf } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ResponsedDiaryPost } from '../../shared/models/diary';
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
  ],
  templateUrl: './diary-post-details.component.html',
  styleUrl: './diary-post-details.component.scss',
})
export class DiaryPostDetailsComponent {
  private route = inject(ActivatedRoute);
  private diaryPostsService = inject(DiaryPostService);
  private fb = inject(FormBuilder);
  private dialog = inject(MatDialog);

  diaryFormGroup: FormGroup;
  diaryPost!: ResponsedDiaryPost;
  isUpdate: boolean = false;
  isMobile: boolean = false;

  constructor() {
    this.diaryFormGroup = this.fb.group({
      userDescribe: [this.diaryPost?.userDescribe, Validators.required],
    });

    this.route.params
      .pipe(
        takeUntilDestroyed(),
        switchMap((params: any) => {
          const noteId = params['id'];
          return this.diaryPostsService.diaryPosts.pipe(
            filter((posts) => !!posts.length),
            map((posts) => posts.find((entry) => entry._id === noteId))
          );
        })
      )
      .subscribe((post) => {
        if (post) {
          console.log(post);

          this.diaryPost = post;
          this.diaryFormGroup.setValue({
            userDescribe: post.userDescribe || '',
          });
        } else {
          console.log('Something wrang');
        }
      });
  }

  onUpdatePost() {
    this.isUpdate = !this.isUpdate;
  }
  onDeletePost() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { title: 'Видалити', confirm: true },
    });

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((result) => {
        if (result) {
          this.diaryPostsService.deletePost(this.diaryPost._id);
        }
      });
  }
  onSubmitForm() {
    if (this.diaryFormGroup.valid) {
      this.diaryPost.userDescribe = this.diaryFormGroup.value.userDescribe;
      this.diaryPostsService.updateDiaryPost(this.diaryPost);
    } else {
      console.log('Something wrang');
    }
  }
}
