import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingService } from '../../shared/services/loading.service';
import { Observable } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-button-with-loader',
  standalone: true,
  imports: [NgIf, MatButtonModule, AsyncPipe, MatProgressSpinnerModule],
  templateUrl: './button-with-loader.component.html',
  styleUrl: './button-with-loader.component.scss',
})
export class ButtonWithLoaderComponent implements OnInit {
  loadingService = inject(LoadingService);

  @Input() buttonType: string = 'submit';
  @Input() title: string = 'Додати';

  loading$!: Observable<boolean>;

  ngOnInit(): void {
    this.loading$ = this.loadingService.isLoading();
  }
}
