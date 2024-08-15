import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { DiaryPostService } from '../../shared/services/diaryPost.service';
import { ResponsedDiaryPost } from '../../shared/models/diary';

@Component({
  selector: 'app-diary-calendar',
  standalone: true,
  imports: [
    DatePipe,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
  ],
  providers: [provideNativeDateAdapter(), DatePipe],
  templateUrl: './diary-calendar.component.html',
  styleUrl: './diary-calendar.component.scss',
})
export class DiaryCalendarComponent {
  diaryPostService = inject(DiaryPostService);

  @Input() diaryPosts: ResponsedDiaryPost[] | undefined;
  @Output() filterPostsByDate = new EventEmitter();
  @Output() getPostsByMonth = new EventEmitter();

  filteredPosts!: ResponsedDiaryPost[];
  selected: Date | null = new Date();
  today = new Date();

  onDateChange(date: Date | null) {
    this.selected = date;
    this.filterPostsByDate.emit(date);
  }
}
