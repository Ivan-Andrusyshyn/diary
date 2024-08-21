import { DatePipe, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ResponsedDiaryPost } from '../../shared/models/diary';

@Component({
  selector: 'app-diary-list',
  standalone: true,
  imports: [DatePipe, RouterLink, NgFor, NgIf],
  templateUrl: './diary-list.component.html',
  styleUrl: './diary-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiaryListComponent {
  @Input() posts!: ResponsedDiaryPost[];
  @Output() scrollToElByClick = new EventEmitter();

  onScrollToElByClick() {
    this.scrollToElByClick.emit();
  }
}
