import { NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DateTime } from 'luxon';
import { ResponseDiaryPost } from '../../shared/models/diary';

@Component({
  selector: 'app-scheduler-cell',
  standalone: true,
  imports: [NgClass, NgIf],
  templateUrl: './scheduler-cell.component.html',
  styleUrl: './scheduler-cell.component.scss',
})
export class SchedulerCellComponent {
  @Input() dayOfMonth!: { date: DateTime; post: ResponseDiaryPost[] };
  @Input() activeDay!: DateTime | null;
  @Input() isInactiveCell!: boolean;

  @Output() scrollToElByClick = new EventEmitter<void>();
  @Output() onSetActiveDay = new EventEmitter<DateTime>();

  onScrollToElByClick = () => {
    this.scrollToElByClick.emit();
  };

  handleActiveDay = (day: DateTime) => {
    this.onSetActiveDay.emit(day);
  };
  get isActiveCell(): boolean {
    return this.activeDay?.toISODate() === this.dayOfMonth.date.toISODate();
  }
}
