import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DateTime, Interval } from 'luxon';
import { ResponseDiaryPost } from '../models/diary';
interface DaysOfMonth {
  [date: string]: ResponseDiaryPost[];
}
@Injectable({
  providedIn: 'root',
})
export class SuccessCalendarService {
  today: DateTime = DateTime.local();

  private activeDay = new BehaviorSubject<DateTime | null>(null);
  activeDay$: Observable<DateTime | null> = this.activeDay.asObservable();

  private firstDayOfActiveMonth = new BehaviorSubject<DateTime>(
    this.today.startOf('month')
  );
  firstDayOfActiveMonth$: Observable<DateTime> =
    this.firstDayOfActiveMonth.asObservable();

  private diaryPostsMap: DaysOfMonth = {};

  constructor() {}
  setFirstDayOfActiveMonth = (date: DateTime) => {
    this.firstDayOfActiveMonth.next(date);
  };
  setActiveDay = (day: DateTime) => {
    if (day !== null) {
      this.activeDay.next(day);
    } else {
      console.log('Something go wrang.');
    }
  };

  getMapsDiaryPosts = () => this.diaryPostsMap;

  updateDiaryPostsMap(diaryPosts: ResponseDiaryPost[]): void {
    const diaryPostsReduce = diaryPosts.reduce((map, post) => {
      const dateStr = DateTime.fromISO(post.createdAt).toISODate() ?? '';
      if (dateStr) {
        if (!map[dateStr]) {
          map[dateStr] = [];
        }
        map[dateStr].push(post);
      }
      return map;
    }, {} as { [date: string]: ResponseDiaryPost[] });

    this.diaryPostsMap = { ...diaryPostsReduce };
  }

  getDaysOfMonth = (): { date: DateTime; post: ResponseDiaryPost[] }[] => {
    const firstDay = this.firstDayOfActiveMonth.value;
    const lastDay = firstDay.endOf('month').endOf('week');

    return Interval.fromDateTimes(firstDay.startOf('week'), lastDay)
      .splitBy({ day: 1 })
      .map((interval) => {
        const date = interval.start as DateTime;
        const dateISO = date.toISODate() ?? '';
        const post = this.diaryPostsMap[dateISO] ?? [];
        return { date, post };
      });
  };
}
