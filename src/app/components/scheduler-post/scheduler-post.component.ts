import { NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Signal,
  WritableSignal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { DateTime } from 'luxon';

import { ResponsedDiaryPost } from '../../shared/models/diary';

@Component({
  selector: 'app-scheduler-post',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink, MatButtonModule],
  templateUrl: './scheduler-post.component.html',
  styleUrl: './scheduler-post.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchedulerPostComponent {
  @Input() activeDayPost!: Signal<ResponsedDiaryPost[]>;
  @Input() activeDay!: WritableSignal<DateTime | null>;

  trackByIndex(index: number): number {
    return index;
  }
}
