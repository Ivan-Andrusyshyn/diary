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

import { ResponsedDiaryPost } from '../../shared/models/diary';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SchedulerPostComponent } from '../scheduler-post/scheduler-post.component';

@Component({
  selector: 'app-scheduler',
  standalone: true,
  imports: [
    NgClass,
    SchedulerPostComponent,
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

  @Input() firstDayOfActiveMonth!: WritableSignal<DateTime>;
  @Input() weekDays!: Signal<string[]>;
  @Input() daysOfMonth!: { date: DateTime; post: ResponsedDiaryPost[] }[];
  @Input() activeDay!: WritableSignal<DateTime | null>;
  @Input() activeDayPost!: Signal<ResponsedDiaryPost[]>;

  @Output() goToPreviousMonth = new EventEmitter<void>();
  @Output() goToNextMonth = new EventEmitter<void>();
  @Output() goToToday = new EventEmitter<void>();
  @Output() openMonthSelector = new EventEmitter<void>();

  DATE_MED = DateTime.DATE_MED;

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
  onPreviousMonth() {
    this.goToPreviousMonth.emit();
  }

  onNextMonth() {
    this.goToNextMonth.emit();
  }

  onToday() {
    this.goToToday.emit();
  }

  onOpenMonthSelector() {
    this.openMonthSelector.emit();
  }
}
