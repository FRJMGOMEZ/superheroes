import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  inject,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { SuperheroeTeam } from 'src/app/modules/superheroes/models/superheroe-team.interface';
import { TeamsApiService } from 'src/app/modules/superheroes/services/teams-api.service';

@Component({
  selector: 'app-team-selector',
  standalone: true,
  imports: [CommonModule, MatRadioModule, FormsModule],
  template: `
    <mat-radio-group
      aria-label="Selecciona un equipo"
      ngModel
      (ngModelChange)="onChange($event)"
    >
      <mat-radio-button *ngFor="let team of teams" [value]="team.text">{{
        team.text
      }}</mat-radio-button>
    </mat-radio-group>
  `,
  styleUrls: ['./team-selector.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TeamSelectorComponent),
      multi: true,
    },
  ],
})
export class TeamSelectorComponent implements ControlValueAccessor {
  teamsApiService = inject(TeamsApiService);
  teams: SuperheroeTeam[];
  cdr = inject(ChangeDetectorRef);

  constructor() {
    this.teamsApiService.getTeams().subscribe((teams) => {
      this.teams = teams;
      this.cdr.detectChanges();
    });
  }

  onChange: any = () => {};

  onTouch: any = () => {};

  writeValue(_) {}

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }
}
