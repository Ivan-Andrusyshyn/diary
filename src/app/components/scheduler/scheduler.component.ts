import {
  Component,
  Signal,
  WritableSignal,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { DateTime } from 'luxon';
import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';

import { ResponseDiaryPost } from '../../shared/models/diary';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SchedulerPostComponent } from '../scheduler-post/scheduler-post.component';
import { SuccessCalendarService } from '../../shared/services/success-calendar.service';
import { Observable } from 'rxjs';
import { SchedulerCellComponent } from '../scheduler-cell/scheduler-cell.component';

@Component({
  selector: 'app-scheduler',
  standalone: true,
  imports: [
    SchedulerPostComponent,
    SchedulerCellComponent,
    RouterLink,
    RouterOutlet,
    NgIf,
    NgFor,
    AsyncPipe,
  ],
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchedulerComponent {
  @ViewChild('scrollTarget') scrollEll!: ElementRef;

  @Input() firstDayOfActiveMonth!: DateTime;
  @Input() daysOfMonth!: { date: DateTime; post: ResponseDiaryPost[] }[];
  @Input() activeDayPost!: ResponseDiaryPost[];

  DATE_MED = DateTime.DATE_MED;

  private successCalendarService = inject(SuccessCalendarService);
  activeDay!: Observable<DateTime | null>;
  constructor() {
    this.activeDay = this.successCalendarService.activeDay$;
  }

  trackByIndex(index: number): number {
    return index;
  }
  scrollToElByClick() {
    if (this.scrollEll && this.scrollEll.nativeElement) {
      this.scrollEll.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    } else {
      console.log('scroll element is not exist.');
    }
  }
  onSetActiveDay = (day: DateTime) => {
    this.successCalendarService.setActiveDay(day);
  };

  getInactiveCell = (month: number): boolean => {
    return month !== this.firstDayOfActiveMonth.month;
  };
}
