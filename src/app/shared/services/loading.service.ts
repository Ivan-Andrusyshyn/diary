import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loading = new BehaviorSubject<boolean>(false);

  showLoadingSpinner() {
    this.loading.next(true);
  }

  hideLoadingSpinner() {
    this.loading.next(false);
  }

  isLoading(): Observable<boolean> {
    return this.loading;
  }
}
