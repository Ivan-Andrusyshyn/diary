import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-scheduler-headline',
  standalone: true,
  imports: [NgFor],
  templateUrl: './scheduler-headline.component.html',
  styleUrl: './scheduler-headline.component.scss',
})
export class SchedulerHeadlineComponent {
  @Input() firstDayOfActiveMonth!: DateTime;
  @Input() weekDays!: string[];

  @Output() openMonthSelector = new EventEmitter<void>();
  @Output() onPreviousMonth = new EventEmitter<void>();
  @Output() onNextMonth = new EventEmitter<void>();
  @Output() goToToday = new EventEmitter<void>();

  handleOpenSelectors() {
    this.openMonthSelector.emit();
  }
  handleToToday() {
    this.goToToday.emit();
  }

  handlePreviousMonth() {
    this.onPreviousMonth.emit();
  }

  handleNextMonth() {
    this.onNextMonth.emit();
  }
  trackByIndex(index: number): number {
    return index;
  }
}
