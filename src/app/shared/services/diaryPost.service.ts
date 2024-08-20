import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { DiaryDatePost, DiaryPost, ResponsedDiaryPost } from '../models/diary';
import { AuthService } from './auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DiaryPostService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private dialog = inject(MatDialog);

  diaryPosts = new BehaviorSubject<ResponsedDiaryPost[]>([]);
  diaryPostsByMonth = new BehaviorSubject<ResponsedDiaryPost[]>([]);
  diaryPosts$ = this.diaryPosts.asObservable();

  devUrl: string = environment.apiUrl;
  diaryUrl: string = this.devUrl + '/diary-posts';

  constructor() {}

  getDiaryPostsByMonth(month: number, year: number) {
    if (this.diaryPosts.value.length > 0) return;

    this.http
      .get<{
        diaryDatesPosts: ResponsedDiaryPost[];
        status: number;
      }>(`${this.diaryUrl}/calendar?month=${month}&year=${year}`)
      .subscribe(
        (response) => {
          console.log(response);

          if (response.status === 200) {
            this.diaryPostsByMonth.next(response.diaryDatesPosts);
          } else {
            console.log('Something went wrong with getDiaryPosts.');
          }
        },
        (error) => {
          console.log(error);
          this.authService.logout();
        }
      );
  }

  getDiaryPosts() {
    if (this.diaryPosts.value.length > 0) return;
    this.http
      .get<{ diaryPosts: ResponsedDiaryPost[]; status: number }>(
        `${this.diaryUrl}`
      )
      .subscribe(
        (response) => {
          if (response.status === 200) {
            this.diaryPosts.next(response.diaryPosts);
          } else {
            console.log('Something wrong on getDiaryPosts.');
          }
        },
        (error) => {
          console.log(error);
          this.authService.logout();
        }
      );
  }

  getDiaryPostsByKeyword(keyword: string) {
    const url = `${this.diaryUrl}/query?keyword=${encodeURIComponent(keyword)}`;

    this.http
      .get<{ diaryPosts: ResponsedDiaryPost[]; status: number }>(url)
      .subscribe(
        (response) => {
          console.log(response);
          if (response.status === 200) {
            this.diaryPosts.next([...response.diaryPosts]);
          } else {
            console.log('Something went wrong with getting diary posts.');
          }
        },
        (error) => {
          console.log(error);
          this.dialog.open(ConfirmDialogComponent, {
            data: { title: error.error.message, confirm: false },
          });
          this.authService.logout();
        }
      );
  }

  deletePost(postId: string) {
    if (postId) {
      this.http.delete(`${this.diaryUrl}/${postId}`).subscribe(
        (response) => {
          const newArray = this.diaryPosts.value.filter(
            (post) => post._id !== postId
          );
          this.diaryPosts.next([...newArray]);
        },
        (error) => {
          console.log(error);
          const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: { title: error.error.message, confirm: false },
          });
        }
      );
    } else {
      console.log('Id is not exist.');
    }
  }

  createDiaryPost(newPost: DiaryPost) {
    if (newPost) {
      this.http
        .post<{
          createdPost: ResponsedDiaryPost;
          createdPostId: string;
          message: string;
          status: number;
        }>(`${this.diaryUrl}`, newPost)
        .subscribe(
          (response) => {
            const posts = [...this.diaryPosts.value, response.createdPost];
            this.diaryPosts.next(posts);
          },
          (error) => {
            console.log(error);
            const dialogRef = this.dialog.open(ConfirmDialogComponent, {
              data: { title: error.error.message, confirm: false },
            });
          }
        );
    } else {
      console.log('New post is not exist.');
    }
  }
  updateDiaryPost(updatedPost: ResponsedDiaryPost) {
    if (updatedPost) {
      this.http
        .put<{ message: string; post: ResponsedDiaryPost }>(
          `${this.diaryUrl}/${updatedPost._id}`,
          updatedPost
        )
        .subscribe(
          (response) => {
            const updatedPosts = this.diaryPosts.value.slice();
            const oldPostIndex = this.diaryPosts.value.findIndex(
              (p) => p._id === updatedPost._id
            );
            updatedPosts[oldPostIndex] = { ...response.post };

            this.diaryPosts.next([...updatedPosts]);
          },
          (error) => {
            console.error('Error updating diary post:', error);
            const dialogRef = this.dialog.open(ConfirmDialogComponent, {
              data: { title: error.error.message, confirm: false },
            });
          }
        );
    } else {
      console.log('The post does not exist.');
    }
  }
}
