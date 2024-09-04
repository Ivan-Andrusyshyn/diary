import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserData } from '../../shared/models/userData.model';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-profile-content',
  standalone: true,
  imports: [NgIf, MatButtonModule],
  templateUrl: './profile-content.component.html',
  styleUrl: './profile-content.component.scss',
})
export class ProfileContentComponent {
  @Input() user!: UserData | null;
  @Input() isUpdate!: boolean;
  @Input() isShow!: boolean;

  @Output() onShowPassword = new EventEmitter<void>();
  @Output() onToggleUpdateInfo = new EventEmitter<UserData>();

  handleShowPassword() {
    this.onShowPassword.emit();
  }

  handleToggleInfo() {
    if (!this.user) return;
    this.onToggleUpdateInfo.emit(this.user);
  }
}
