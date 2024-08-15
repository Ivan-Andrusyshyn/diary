import {
  Directive,
  Input,
  ElementRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appImageLoader]',
})
export class ImageLoaderDirective implements OnChanges {
  @Input() appImageLoader: string | undefined; // Input property for image URL or base64 string

  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appImageLoader']) {
      this.updateImage();
    }
  }

  private updateImage(): void {
    if (this.appImageLoader) {
      this.el.nativeElement.src = this.appImageLoader;
    }
  }
}
