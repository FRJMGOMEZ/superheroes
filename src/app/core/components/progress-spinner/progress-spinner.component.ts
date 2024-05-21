import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProgressSpinnerService } from './progress-spinner.service';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-progress-spinner',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  template: `
     <div *ngIf="show$ | async" class="spinner-container">
     <mat-progress-spinner color="primary" mode="indeterminate" value="50" >
     </mat-progress-spinner>
     </div>
  `,
  styleUrls: ['./progress-spinner.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressSpinnerComponent {
  
  private progressSpinnerService = inject(ProgressSpinnerService);

  get show$(){
    return this.progressSpinnerService.show$;
  }
}
