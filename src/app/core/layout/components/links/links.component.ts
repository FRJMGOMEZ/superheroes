import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-links',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, RouterModule],
  template: `
  <div class="links-container">
  <button
      mat-fab
      extended
      color="primary"
      [routerLink]="['superheroes', 'search']"
      routerLinkActive="active"
    >
      <a matTooltip="Ir a buscador de superhéroes">
      <mat-icon>search</mat-icon>
        <span class="route-title">Buscar superhéroes</span>
      </a>
    </button>
    <button
      mat-fab
      extended
      color="primary"
      [routerLink]="['superheroes', 'new']"
      routerLinkActive="active"
    >
      <a matTooltip="Crear un nuevo superhéroe">
      <mat-icon>add_person</mat-icon>
        <span class="route-title">Crear nuevo superhéroe</span>
      </a>
    </button>
  </div>
  `,
  styleUrls: ['./links.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinksComponent {}
