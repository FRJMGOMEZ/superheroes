
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { of } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { TeamsApiService } from 'src/app/modules/superheroes/services/teams-api.service';
import { TeamSelectorComponent } from './team-selector.component';
import { SuperheroeTeam } from 'src/app/modules/superheroes/models/superheroe-team.interface';

describe('TeamSelectorComponent', () => {
    let component: TeamSelectorComponent;
    let fixture: ComponentFixture<TeamSelectorComponent>;
    let teamsApiServiceSpy: jasmine.SpyObj<TeamsApiService>;
    const teams: SuperheroeTeam[] = [
        { text: 'Marvel' },
        { text: 'DC' }
    ];
    let teamsSpy;

    beforeEach(waitForAsync(() => {
        const teamsApiSpy = jasmine.createSpyObj('TeamsApiService', ['getTeams']);

        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                MatFormFieldModule,
                MatRadioModule,
                TeamSelectorComponent
            ],
            providers: [
                { provide: TeamsApiService, useValue: teamsApiSpy },
                ChangeDetectorRef
            ]
        }).compileComponents();

        teamsApiServiceSpy = TestBed.inject(TeamsApiService) as jasmine.SpyObj<TeamsApiService>;
        teamsSpy = teamsApiServiceSpy.getTeams.and.returnValue(of(teams));
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TeamSelectorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('Se deben de cargar los teams en el constructor', () => {
        expect(teamsSpy).toHaveBeenCalled();
        expect(component.teams).toEqual(teams);
    });

    it('Cuando se setee un team por el writeValue el teamSelected debe ser el team que recibe esta función', () => {
        component.writeValue('Marvel');
        expect(component.teamSelected).toBe('Marvel');
    });
});