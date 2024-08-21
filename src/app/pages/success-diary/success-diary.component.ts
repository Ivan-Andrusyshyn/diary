import {
  Component,
  computed,
  inject,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { DateTime, Info, Interval } from 'luxon';
import { MatDialog } from '@angular/material/dialog';

import { SchedulerComponent } from '../../components/scheduler/scheduler.component';
import { ResponsedDiaryPost } from '../../shared/models/diary';
import { DiaryPostService } from '../../shared/services/diaryPost.service';
import { MonthSelectorDialogComponent } from '../../components/month-selector-dialog/month-selector-dialog.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success-diary',
  standalone: true,
  imports: [SchedulerComponent],
  templateUrl: './success-diary.component.html',
  styleUrl: './success-diary.component.scss',
})
export class SuccessDiaryComponent {
  private diaryPostService = inject(DiaryPostService);
  private dialog = inject(MatDialog);
  private router = inject(Router);

  today: Signal<DateTime> = signal(DateTime.local());

  diaryPosts: ResponsedDiaryPost[] = [];
  diaryPostsMap: { [date: string]: ResponsedDiaryPost[] } = {};

  firstDayOfActiveMonth: WritableSignal<DateTime> = signal(
    this.today().startOf('month')
  );

  activeDay: WritableSignal<DateTime | null> = signal(null);
  weekDays: Signal<string[]> = signal(Info.weekdays('short'));

  daysOfMonth: { date: DateTime; post: ResponsedDiaryPost[] }[] = [];

  activeDayPost: Signal<ResponsedDiaryPost[]> = computed(() => {
    const activeDay = this.activeDay();

    if (!activeDay) return [];
    const activeDayISO = activeDay.toISODate();
    return activeDayISO ? this.diaryPostsMap[activeDayISO] : [];
  });
  constructor() {
    this.loadDiaryPosts();
  }
  openMonthSelector(): void {
    const dialogRef = this.dialog.open(MonthSelectorDialogComponent, {
      data: { currentMonth: this.firstDayOfActiveMonth().month },
    });

    dialogRef.afterClosed().subscribe((selectedMonth) => {
      if (selectedMonth) {
        this.firstDayOfActiveMonth.set(
          this.firstDayOfActiveMonth().set({ month: selectedMonth })
        );
        this.loadDiaryPosts();
      }
    });
  }
  goToPreviousMonth(): void {
    this.firstDayOfActiveMonth.set(
      this.firstDayOfActiveMonth().minus({ month: 1 })
    );
    this.loadDiaryPosts();
  }
  private loadDiaryPosts(): void {
    const { month, year } = this.getCurrentMonthAndYear();
    this.diaryPostService.getDiaryPostsByMonth(month, year);

    this.diaryPostService.diaryPostsByMonth
      .pipe(takeUntilDestroyed())
      .subscribe((posts: ResponsedDiaryPost[]) => {
        if (posts) {
          this.diaryPosts = posts;
          this.updateDiaryPostsMap();
          this.updateDaysOfMonth();
        } else {
          console.log('No diary posts found.');
        }
      });
  }

  goToToday(): void {
    this.firstDayOfActiveMonth.set(this.today().startOf('month'));
    this.loadDiaryPosts();
  }
  goToNextMonth(): void {
    this.firstDayOfActiveMonth.set(
      this.firstDayOfActiveMonth().plus({ month: 1 })
    );
    this.loadDiaryPosts();
  }

  private updateDaysOfMonth(): void {
    const firstDay = this.firstDayOfActiveMonth();
    const lastDay = firstDay.endOf('month').endOf('week');

    this.daysOfMonth = Interval.fromDateTimes(firstDay.startOf('week'), lastDay)
      .splitBy({ day: 1 })
      .map((interval) => {
        const date = interval.start as DateTime;
        const dateISO = date.toISODate() ?? '';
        const post = this.diaryPostsMap[dateISO] ?? [];
        return { date, post };
      });
  }
  private getCurrentMonthAndYear(): { month: number; year: number } {
    const date = this.firstDayOfActiveMonth();
    return { month: date.month, year: date.year };
  }
  private updateDiaryPostsMap(): void {
    this.diaryPostsMap = this.diaryPosts.reduce((map, post) => {
      const dateStr = DateTime.fromISO(post.createdAt).toISODate() ?? '';
      if (dateStr) {
        if (!map[dateStr]) {
          map[dateStr] = [];
        }
        map[dateStr].push(post);
      }
      return map;
    }, {} as { [date: string]: ResponsedDiaryPost[] });
  }
}
