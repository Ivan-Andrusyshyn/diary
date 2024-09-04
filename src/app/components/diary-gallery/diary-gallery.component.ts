import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DiaryContentArray } from '../../shared/models/diary';

@Component({
  selector: 'app-diary-gallery',
  standalone: true,
  imports: [NgFor],
  templateUrl: './diary-gallery.component.html',
  styleUrl: './diary-gallery.component.scss',
})
export class DiaryGalleryComponent {
  @Input() pictures!: DiaryContentArray[];
  @Input() currentImage!: DiaryContentArray;

  @Output() onChooseImage = new EventEmitter<DiaryContentArray>();

  handleChangeImg(img: DiaryContentArray): void {
    this.onChooseImage.emit(img);
  }
}
