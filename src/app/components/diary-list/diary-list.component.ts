import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ResponsedDiaryPost } from '../../shared/models/diary';

@Component({
  selector: 'app-diary-list',
  standalone: true,
  imports: [DatePipe, RouterLink, NgFor, NgIf],
  templateUrl: './diary-list.component.html',
  styleUrl: './diary-list.component.scss',
})
export class DiaryListComponent {
  @Input() posts!: ResponsedDiaryPost[];

  screenWidth = window.innerWidth;
  baseUrl: string = '/diary-posts';
  pageUrl!: string;
  constructor() {
    this.pageUrl =
      this.screenWidth > 1200 ? this.baseUrl : `${this.baseUrl}/mobile`;
  }

  getCutText(text: string) {
    return text.length > 12 ? text.substring(0, 16) + ' більше...' : text || '';
  }
}
