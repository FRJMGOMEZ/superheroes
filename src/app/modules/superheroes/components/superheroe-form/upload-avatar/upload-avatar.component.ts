import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
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
      <app-show-avatar [file]="file" [link]="link" />
            <button mat-flat-button color="primary" (click)="fileUpload.click()">
        Selecciona una imagen que sirva de avatar <mat-icon>attach_file</mat-icon>
      </button>
    </div>
  `,
  styleUrls: ['./upload-avatar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UploadAvatarComponent),
      multi: true,
    },
  ],
})
export class UploadAvatarComponent implements ControlValueAccessor {
  file: File;
  link:string;
  fileSelected(event) {
    this.file = event.target.files[0];
    this.onChange(this.file)
  }

  onChange: any = () => { };

  onTouch: any = () => { };

  writeValue(avatarLink:string) {
    console.log(avatarLink)
   this.link = avatarLink;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }


}
