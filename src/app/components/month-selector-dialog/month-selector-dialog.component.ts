import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Info } from 'luxon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { NgFor, NgIf } from '@angular/common';
import { DialogModel } from '../../shared/models/dialog.model';

@Component({
  selector: 'app-month-selector-dialog',
  standalone: true,
  imports: [MatDialogModule, MatSelectModule, MatButtonModule, NgFor, NgIf],
  templateUrl: './month-selector-dialog.component.html',
  styleUrl: './month-selector-dialog.component.scss',
})
export class MonthSelectorDialogComponent {
  months = Info.months('long', { locale: 'uk' });
  data = inject(MAT_DIALOG_DATA);
  dialogRef: MatDialogRef<{ currentMonth: number }> = inject(MatDialogRef);

  selectedMonth: number = this.data.currentMonth;

  onCancel(): void {
    this.dialogRef.close(this.selectedMonth);
  }
  onSelectMonth(month: number): void {
    this.selectedMonth = month;
  }
  onSelect(): void {
    this.dialogRef.close(this.selectedMonth);
  }
}
