import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { DateTime, Info } from 'luxon';
import { MatDialog } from '@angular/material/dialog';

import { SchedulerComponent } from '../../components/scheduler/scheduler.component';
import { ResponseDiaryPost } from '../../shared/models/diary';
import { DiaryPostService } from '../../shared/services/diaryPost.service';
import { MonthSelectorDialogComponent } from '../../components/month-selector-dialog/month-selector-dialog.component';
import { SuccessCalendarService } from '../../shared/services/success-calendar.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SchedulerHeadlineComponent } from '../../components/scheduler-headline/scheduler-headline.component';

interface DayOfMonth {
  date: DateTime;
  post: ResponseDiaryPost[];
}

@Component({
  selector: 'app-success-diary',
  standalone: true,
  imports: [SchedulerComponent, SchedulerHeadlineComponent],
  templateUrl: './success-diary.component.html',
  styleUrl: './success-diary.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuccessDiaryComponent {
  private diaryPostService = inject(DiaryPostService);
  private dialog = inject(MatDialog);
  private cd = inject(ChangeDetectorRef);
  private successCalendarService = inject(SuccessCalendarService);

  today: DateTime = DateTime.local();
  weekDays: string[] = Info.weekdays('short');

  diaryPosts: ResponseDiaryPost[] = [];

  firstDayOfActiveMonth!: DateTime;

  activeDay!: DateTime;
  daysOfMonth: DayOfMonth[] = [];

  activeDayPost!: ResponseDiaryPost[];

  constructor() {
    this.successCalendarService.firstDayOfActiveMonth$
      .pipe(takeUntilDestroyed())
      .subscribe((value: DateTime) => {
        this.firstDayOfActiveMonth = value;
      });
    this.diaryPostService.diaryPostsByMonth
      .pipe(takeUntilDestroyed())
      .subscribe((posts: ResponseDiaryPost[]) => {
        if (posts) {
          this.setDaysOfMonth(posts);
        } else {
          console.log('No diary posts found.');
        }
      });
    this.successCalendarService.activeDay$
      .pipe(takeUntilDestroyed())
      .subscribe((day) => {
        if (day) {
          this.setActiveDayPost(day);
        } else {
          console.log('The day is not exist.');
        }
      });

    this.loadDiaryPosts();
  }
  openMonthSelector(): void {
    const dialogRef = this.dialog.open(MonthSelectorDialogComponent, {
      data: { currentMonth: this.firstDayOfActiveMonth.month },
    });

    dialogRef.afterClosed().subscribe((selectedMonth) => {
      if (selectedMonth) {
        this.successCalendarService.setFirstDayOfActiveMonth(
          this.firstDayOfActiveMonth.set({ month: selectedMonth })
        );
        this.loadDiaryPosts();
      }
    });
  }

  goToPreviousMonth(): void {
    this.successCalendarService.setFirstDayOfActiveMonth(
      this.firstDayOfActiveMonth.minus({ month: 1 })
    );
    this.loadDiaryPosts();
  }
  private loadDiaryPosts(): void {
    const { month, year } = this.getCurrentMonthAndYear();
    this.diaryPostService.getDiaryPostsByMonth(month, year);
  }

  goToToday(): void {
    this.firstDayOfActiveMonth = this.today.startOf('month');
    this.successCalendarService.setFirstDayOfActiveMonth(
      this.firstDayOfActiveMonth
    );

    this.loadDiaryPosts();

    this.successCalendarService.setActiveDay(this.today);
    this.setActiveDayPost(this.today);
  }

  goToNextMonth(): void {
    this.successCalendarService.setFirstDayOfActiveMonth(
      this.firstDayOfActiveMonth.plus({ month: 1 })
    );

    this.loadDiaryPosts();
  }
  private setDaysOfMonth = (posts: ResponseDiaryPost[]) => {
    this.successCalendarService.updateDiaryPostsReduce(posts);
    this.daysOfMonth = this.successCalendarService.getDaysOfMonth();
    this.cd.markForCheck();
  };
  private setActiveDayPost = (day: DateTime) => {
    this.activeDay = day;

    const activeDayISO = day.toISODate();

    this.activeDayPost = activeDayISO
      ? this.successCalendarService.getReducedDiaryPosts()[activeDayISO]
      : [];
  };
  private getCurrentMonthAndYear(): { month: number; year: number } {
    const date = this.firstDayOfActiveMonth;
    return { month: date.month, year: date.year };
  }
}
