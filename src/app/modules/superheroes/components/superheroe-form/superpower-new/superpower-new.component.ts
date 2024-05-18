import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output, TemplateRef, ViewChild, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SuperpowerApiService } from '../../../services/superpower-api.service';

@Component({
  selector: 'app-superpower-new',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
    ReactiveFormsModule
  ],
  template: `
          <button mat-button (click)="openModal()" >Crear nuevo superpoder</button>
          <ng-template #superpowerTRef >
            <mat-dialog-content>
             <mat-form-field>
              <mat-label>Puedes crear un nuevo superpoder</mat-label>
               <input [formControl]="superpowerControl" matInput>
             </mat-form-field>
              <div class="btn-div">
                  <button [disabled]="superpowerControl.invalid" mat-button (click)="addSuperpower()" >Añadir</button>
              </div>
           </mat-dialog-content>
          </ng-template>
  `,
  styleUrls: ['./superpower-new.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuperpowerNewComponent {
  @ViewChild('superpowerTRef') superpowerTRef: TemplateRef<any>;
  @Output() superpowerAdded = new EventEmitter<string>();
  private fb = inject(FormBuilder);
  private supoerpowerApiService = inject(SuperpowerApiService);
  superpowerControl = this.fb.control('', [Validators.required, Validators.minLength(3)]);
  public dialog = inject(MatDialog);
  private dialogRef: MatDialogRef<any>;
  openModal() {
    this.dialogRef = this.dialog.open(this.superpowerTRef);
  }
  addSuperpower() {
    this.supoerpowerApiService.addSuperpower(this.superpowerControl.value).subscribe(() => {
      this.dialogRef.close();
      this.superpowerAdded.next(this.superpowerControl.value);
    })
  }
}
