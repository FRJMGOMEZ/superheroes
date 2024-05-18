import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  forwardRef,
  inject,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { SuperheroeTeam } from 'src/app/modules/superheroes/models/superheroe-team.interface';
import { TeamsApiService } from 'src/app/modules/superheroes/services/teams-api.service';

@Component({
  selector: 'app-team-selector',
  standalone: true,
  imports: [CommonModule, MatRadioModule, FormsModule, MatFormFieldModule],
  template: `
     <mat-label>Elige un equipo para tu superhéroe {{ required ? '* :' : ':' }} </mat-label>
    <mat-radio-group
      aria-label="Selecciona un equipo"
      [ngModel]="teamSelected"
      (ngModelChange)="onChange($event)"
    >
      <mat-radio-button *ngFor="let team of teams" [value]="team.text">{{
        team.text
      }}</mat-radio-button>
    </mat-radio-group>
  `,
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
  @Input() required:boolean;
  teamsApiService = inject(TeamsApiService);
  teams: SuperheroeTeam[];
  teamSelected:string;
  cdr = inject(ChangeDetectorRef);

  constructor() {
    this.teamsApiService.getTeams().subscribe((teams) => {
      this.teams = teams;
      this.cdr.detectChanges();
    });
  }

  onChange: any = () => {};

  onTouch: any = () => {};

  writeValue(teamSelected:string) {
   this.teamSelected = teamSelected;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }
}
