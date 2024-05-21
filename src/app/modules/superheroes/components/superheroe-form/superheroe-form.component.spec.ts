import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SuperheroeFormComponent } from './superheroe-form.component';
import { SuperpowerSelectComponent } from './superpower-select/superpower-select.component';
import { TeamSelectorComponent } from './team-selector/team-selector.component';
import { UploadAvatarComponent } from './upload-avatar/upload-avatar.component';
import { Superheroe } from '../../models/superheroe.interface';
import { CommonModule } from '@angular/common';

describe('SuperheroeFormComponent', () => {
    let component: SuperheroeFormComponent;
    let fixture: ComponentFixture<SuperheroeFormComponent>;
    let fb: FormBuilder;
    const superheroe: Superheroe = {
        realName: 'Juan López Fernández',
        nickName: 'Superlópez',
        team: 'DC',
        superpowers: ['Superbondad', 'Superdestreza'],
        avatar: 'superlopez.png',
        id: '123'
    };

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                MatButtonModule,
                MatFormFieldModule,
                MatInputModule,
                ReactiveFormsModule,
                TeamSelectorComponent,
                SuperpowerSelectComponent,
                UploadAvatarComponent,
                MatSnackBarModule,
                SuperheroeFormComponent
            ],
            providers: [FormBuilder]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SuperheroeFormComponent);
        fixture.detectChanges()
        component = fixture.componentInstance;
        fb = TestBed.inject(FormBuilder);
        fixture.detectChanges();
    });

    afterEach(() => {
        if (component.superheroesChangesSubscription) {
            component.superheroesChangesSubscription.unsubscribe();
        }
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('Debe setear el valor del formulario con el valor del argumento de writeValue', () => {
        component.writeValue(superheroe);
        expect(component.superheroeForm.value).toEqual({
            name: {
                realName: 'Juan López Fernández',
                nickName: 'Superlópez',
            },
            team: 'DC',
            superpowers: ['Superbondad', 'Superdestreza'],
            avatar: 'superlopez.png'
        });
    });

    it('Cuando el campo team del formulario no tenga valor, este debe ser inválido', () => {
        component.setForm({
            realName: '',
            nickName: '',
            team: '',
            superpowers: null,
            avatar: ''
        } as Superheroe);
        expect(component.validate()).toEqual({ invalid: true });
    });

    it('Cuando el campo team del formulario tenga valor, este debe ser válido', () => {
        component.setForm(superheroe);
        expect(component.validate()).toBeNull();
    });

})