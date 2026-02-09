import { ChangeDetectionStrategy, Component, Inject, inject, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { DialogData } from '../../models/dialog-data';

@Component({
  selector: 'app-dialog',
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatDialogContent,
    MatDialogClose,
    MatDialogActions,
    MatDialogTitle,
  ],
  templateUrl: './dialog.html',
  styleUrl: './dialog.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dialog {
  readonly menuTrigger = viewChild.required(MatMenuTrigger);
  readonly dialog = inject(MatDialog);

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
