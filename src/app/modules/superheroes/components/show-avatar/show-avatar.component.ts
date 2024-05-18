import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common'

@Component({
  selector: 'app-show-avatar',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage
  ],
  template: `
     <img *ngIf="fileUrl || link" [src]="fileUrl || link ? fileUrl || link : null"  [width]="width" [height]="height"  >
  `,
  styleUrls: ['./show-avatar.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ShowAvatarComponent implements OnChanges {
  private cdr = inject(ChangeDetectorRef);
  @Input() file:File;
  @Input() link:string;

  @Input() height = 150;

  @Input() width = 200;
  fileUrl:string;
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['file']){
      this.fileUrl = this.file ? URL.createObjectURL(this.file) : null;
      this.cdr.detectChanges();
    }  
  }
}
