import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appSchedulerBg]',
  standalone: true,
})
export class SchedulerBgDirective {
  private _cellImage: string = '';

  @Input() set appSchedulerBg(value: string) {
    this._cellImage = value;
    this.updateBackgroundImage();
  }

  @HostBinding('style.backgroundImage') backgroundImage: string = '';

  private updateBackgroundImage() {
    this.backgroundImage =
      'linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(' +
      this._cellImage +
      ')';
  }
}
