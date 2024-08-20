import {
  Component,
  Signal,
  WritableSignal,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { DateTime, Info } from 'luxon';
import { NgClass, NgFor, NgIf } from '@angular/common';

import { ResponsedDiaryPost } from '../../shared/models/diary';

@Component({
  selector: 'app-scheduler',
  standalone: true,
  imports: [NgClass, NgIf, NgFor],
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss'],
})
export class SchedulerComponent {
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
