import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SuperpowerNewDialogComponent } from './superpower-new-dialog/superpower-new-dialog.component';

@Component({
  selector: 'app-superpower-new',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
    SuperpowerNewDialogComponent
  ],
  template: `
          <button mat-button (click)="openModal()" >Crear nuevo superpoder</button>
  `,
  styleUrls: ['./superpower-new.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuperpowerNewComponent {
  @Output() superpowerAdded = new EventEmitter<string>();
  public dialog = inject(MatDialog);
  openModal() {
    this.dialog.open(SuperpowerNewDialogComponent).afterClosed().subscribe((newSuperpower: string) => {
      if (newSuperpower) {
        this.superpowerAdded.next(newSuperpower);
      }
    })
  }
}
