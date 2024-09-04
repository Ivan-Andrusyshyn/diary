import { Component, inject, Input } from '@angular/core';
import { LoadingService } from '../../shared/services/loading.service';
import { Observable } from 'rxjs';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { MatSpinner } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-form-loader',
  standalone: true,
  imports: [NgIf, MatSpinner, NgClass, MatButtonModule, AsyncPipe],
  templateUrl: './form-loader.component.html',
  styleUrl: './form-loader.component.scss',
})
export class FormLoaderComponent {
  loadingService = inject(LoadingService);

  @Input() title: string = 'Додати';
  @Input() color?: string = 'primary';
  loading$!: Observable<boolean>;

  ngOnInit(): void {
    this.loading$ = this.loadingService.isLoading();
  }
}
