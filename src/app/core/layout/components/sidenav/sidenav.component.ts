import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
  ],
  template: `
    <div>
    <mat-toolbar color="primary" >
        <button mat-icon-button (click)="snav.toggle()">
            <mat-icon>menu</mat-icon>
        </button>
        <h1 class="example-app-name">SuperAdmin</h1>
    </mat-toolbar>

    <mat-sidenav-container >
        <mat-sidenav opened #snav [mode]="'side'"
            fixedTopGap="56">
            <ng-content select="[id=links]"></ng-content>
        </mat-sidenav>
        <mat-sidenav-content>
            <ng-content select="[id=content]"></ng-content>
        </mat-sidenav-content>
    </mat-sidenav-container>
</div>

  `,
  styleUrls: ['./sidenav.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent {}
