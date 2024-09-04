import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ResponseDiaryPost } from '../../shared/models/diary';
import { LoaderComponent } from '../loader/loader.component';
import { LoadingService } from '../../shared/services/loading.service';

@Component({
  selector: 'app-diary-list',
  standalone: true,
  imports: [DatePipe, AsyncPipe, LoaderComponent, RouterLink, NgFor, NgIf],
  templateUrl: './diary-list.component.html',
  styleUrl: './diary-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiaryListComponent {
  @Input() posts!: ResponseDiaryPost[];
  @Output() scrollToElByClick = new EventEmitter();

  loadingService = inject(LoadingService);

  onScrollToElByClick() {
    this.scrollToElByClick.emit();
  }
}
