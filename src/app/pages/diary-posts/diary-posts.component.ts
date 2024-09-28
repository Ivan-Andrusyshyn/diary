import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, debounceTime, Observable } from 'rxjs';
import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { RouterOutlet } from '@angular/router';

import { DiaryPostService } from '../../shared/services/diaryPost.service';
import { DiaryPostDetailsComponent } from '../diary-post-details/diary-post-details.component';
import { ResponseDiaryPost } from '../../shared/models/diary';
import { DiaryComponent } from '../diary/diary.component';
import { DiaryListComponent } from '../../components/diary-list/diary-list.component';
import { LoadingService } from '../../shared/services/loading.service';
import { LoadingDirective } from '../../shared/directives/loading.directive';
import { slideInAnimation } from '../../shared/animations/slideInAnimation';

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
    MatFormFieldModule,
    MatInputModule,
    DiaryComponent,
    MatTabsModule,
    DatePipe,
    FormsModule,
    DiaryPostDetailsComponent,
    MatPaginatorModule,
    LoadingDirective,
  ],
  templateUrl: './diary-posts.component.html',
  styleUrl: './diary-posts.component.scss',
  animations: [slideInAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiaryPostsComponent {
  @ViewChild('scrollTarget') scrollEll!: ElementRef;

  private diaryPostService = inject(DiaryPostService);
  private loadingService = inject(LoadingService);

  private search = new BehaviorSubject<string>('');

  diaryPosts$!: Observable<ResponseDiaryPost[]>;
  pageIndex: number = 0;
  pageSize: number = 5;
  diaryTotalLength$!: Observable<number>;
  loading$!: Observable<boolean>;

  constructor() {
    this.loading$ = this.loadingService.isLoading();
    this.diaryPostService.getDiaryPosts(this.pageIndex + 1, this.pageSize);
    this.diaryPosts$ = this.diaryPostService.diaryPosts$;

    this.search
      .pipe(debounceTime(500), takeUntilDestroyed())
      .subscribe((searchText: string) => {
        if (searchText.trim()) {
          this.diaryPostService.getDiaryPostsByKeyword(searchText);
        } else {
          console.log('Here is problem with keyword.');
        }
      });

    this.diaryTotalLength$ = this.diaryPostService.diaryTotalLength$;
  }

  getProductsWithPagination(pageEvent: PageEvent | null) {
    this.pageIndex = pageEvent?.pageIndex || 0;
    this.pageSize = pageEvent?.pageSize || 2;

    this.diaryPostService.getDiaryPosts(this.pageIndex + 1, this.pageSize);
  }
  onSearch(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const searchText = inputElement.value;

    if (searchText) {
      this.search.next(searchText);
    } else {
      this.diaryPostService.getDiaryPosts(this.pageIndex + 1, this.pageSize);
    }
  }

  onScrollToTargetEl() {
    this.scrollEll.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
  scrollToElByClick() {
    if (this.scrollEll && this.scrollEll.nativeElement) {
      this.onScrollToTargetEl();
    } else {
      console.log('scroll element is not exist.');
    }
  }
}
