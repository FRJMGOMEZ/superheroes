import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SuperpowerApiService } from 'src/app/modules/superheroes/services/superpower-api.service';

@Component({
  selector: 'app-superpower-new-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  template: `
            <mat-dialog-content>
             <mat-form-field>
              <mat-label>Puedes crear un nuevo superpoder</mat-label>
               <input [formControl]="superpowerControl" matInput>
             </mat-form-field>
              <div class="btn-div">
                  <button [disabled]="superpowerControl.invalid" mat-button (click)="addSuperpower()" >Añadir</button>
              </div>
           </mat-dialog-content>
  `,
  styleUrls: ['./superpower-new-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuperpowerNewDialogComponent {
  private dialogRef = inject(MatDialogRef<SuperpowerNewDialogComponent>);
  private superpowerApiService = inject(SuperpowerApiService);
  private fb = inject(FormBuilder);
  superpowerControl = this.fb.control('', [Validators.required, Validators.minLength(3)]);
  addSuperpower() {
    this.superpowerApiService.addSuperpower(this.superpowerControl.value).subscribe(() => {
      this.dialogRef.close(this.superpowerControl.value);
    })
  }
}
