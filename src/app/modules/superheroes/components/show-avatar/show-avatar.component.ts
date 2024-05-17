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
     <img *ngIf="fileUrl" [src]="fileUrl || link ? fileUrl || link : null"  width="400" height="200"  >
  `,
  styleUrls: ['./show-avatar.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ShowAvatarComponent implements OnChanges {
  private cdr = inject(ChangeDetectorRef);
  @Input() file:File;
  @Input() link:string;
  fileUrl:string;
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['file']){
      this.fileUrl = this.file ? URL.createObjectURL(this.file) : null;
      this.cdr.detectChanges();
    }  
  }
}
