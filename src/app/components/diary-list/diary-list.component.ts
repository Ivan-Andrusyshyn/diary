import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ResponseDiaryPost } from '../../shared/models/diary';
import { LoaderComponent } from '../loader/loader.component';
import { LoadingService } from '../../shared/services/loading.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-diary-list',
  standalone: true,
  imports: [DatePipe, AsyncPipe, LoaderComponent, RouterLink, NgFor, NgIf],
  templateUrl: './diary-list.component.html',
  styleUrl: './diary-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiaryListComponent implements OnInit {
  @Input() posts!: ResponseDiaryPost[];
  @Output() scrollToElByClick = new EventEmitter();
  isLoading$!: Observable<boolean>;

  private loadingService = inject(LoadingService);

  ngOnInit(): void {
    this.isLoading$ = this.loadingService.isLoading();
  }
  onScrollToElByClick() {
    this.scrollToElByClick.emit();
  }
}
