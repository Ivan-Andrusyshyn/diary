import { Component, inject } from '@angular/core';

import { DiaryPostService } from '../../shared/services/diaryPost.service';
import { ResponsedDiaryPost } from '../../shared/models/diary';
import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { LoaderComponent } from '../../components/loader/loader.component';
import { LoadingService } from '../../shared/services/loading.service';
import { DiaryCalendarComponent } from '../../components/diary-calendar/diary-calendar.component';

import { DiaryComponent } from '../diary/diary.component';
import { DiaryListComponent } from '../../components/diary-list/diary-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, debounceTime, Subject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DiaryPostDetailsComponent } from '../diary-post-details/diary-post-details.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
@Component({
  selector: 'app-diary-posts',
  standalone: true,
  imports: [
    DatePipe,
    RouterOutlet,
    NgIf,
    AsyncPipe,
    MatCardModule,
    DiaryListComponent,
    LoaderComponent,
    MatFormFieldModule,
    MatInputModule,
    DiaryCalendarComponent,
    DiaryCalendarComponent,
    DiaryComponent,
    MatTabsModule,
    FormsModule,
    DiaryPostDetailsComponent,
  ],
  providers: [DatePipe],

  templateUrl: './diary-posts.component.html',
  styleUrl: './diary-posts.component.scss',
})
export class DiaryPostsComponent {
  private diaryPostService = inject(DiaryPostService);
  loadingService = inject(LoadingService);
  datePipe = inject(DatePipe);
  private router = inject(Router);
  private dialog = inject(MatDialog);

  private search = new BehaviorSubject<string>('');
  diaryPosts!: ResponsedDiaryPost[];
  filteredPosts!: ResponsedDiaryPost[];

  screenWidth = window.innerWidth;

  constructor() {
    this.diaryPostService.diaryPosts$.subscribe((response) => {
      if (response.length === 0 && !this.search.value) {
        this.diaryPostService.getDiaryPosts();
      }
      this.diaryPosts = response.slice();
      this.filteredPosts = response.slice();
    });
    this.search
      .pipe(debounceTime(300), takeUntilDestroyed())
      .subscribe((searchText: string) => {
        if (searchText.trim()) {
          this.diaryPostService.getDiaryPostsByKeyword(searchText);
        } else {
          this.diaryPostService.getDiaryPosts();
          console.log('Here is problem with keyword.');
        }
      });
  }
  onSearch(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const searchText = inputElement.value;

    if (searchText !== null) {
      this.search.next(searchText);
    }
  }

  filterPostsByDate(date: Date | null) {
    if (date) {
      const formattedDate = this.datePipe.transform(date, 'dd/MM/yyyy');
      const choosePost = this.diaryPosts.filter(
        (post) =>
          this.datePipe.transform(post.createdAt, 'dd/MM/yyyy') ===
          formattedDate
      );
      console.log(choosePost);
      if (choosePost.length === 0) {
        this.dialog.open(ConfirmDialogComponent, {
          data: { title: 'Цієї дати у вас немає допису.', confirm: false },
        });
        return;
      }
      if (choosePost && this.screenWidth > 1200) {
        this.router.navigate(['/diary-posts', choosePost[0]._id]);
      } else if (choosePost && this.screenWidth < 1200) {
        this.router.navigate(['/diary-posts/mobile', choosePost[0]._id]);
      }
    } else {
      this.filteredPosts = this.diaryPosts;
    }
  }
}
