import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ShowAvatarComponent } from 'src/app/modules/superheroes/components/show-avatar/show-avatar.component';
@Component({
  selector: 'app-upload-avatar',
  standalone: true,
  imports: [CommonModule, MatIconModule, ShowAvatarComponent, MatButtonModule],
  template: `
    <input type="file" hidden (change)="fileSelected($event)" #fileUpload accept=".png, .jpg, .gif, .jpeg" />
    <div class="file-upload">
      <button mat-flat-button color="primary" (click)="fileUpload.click()">
        Selecciona una imagen <mat-icon>attach_file</mat-icon>
      </button>
      <app-show-avatar [file]="file" />
    </div>
  `,
  styleUrls: ['./upload-avatar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadAvatarComponent  {
  @Output() fileHasBeenLoaded = new EventEmitter<File>();
  file: File;
  fileSelected(event) {
    this.file = event.target.files[0];
    this.fileHasBeenLoaded.next(this.file);
  }
}
