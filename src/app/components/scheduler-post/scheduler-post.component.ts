import { NgFor, NgIf } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  Signal,
  WritableSignal,
} from '@angular/core';

import { ResponsedDiaryPost } from '../../shared/models/diary';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-scheduler-post',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink, MatButtonModule],
  templateUrl: './scheduler-post.component.html',
  styleUrl: './scheduler-post.component.scss',
})
export class SchedulerPostComponent {
  @Input() activeDayPost!: Signal<ResponsedDiaryPost[]>;
  @Input() activeDay!: WritableSignal<DateTime | null>;

  trackByIndex(index: number): number {
    return index;
  }
}
