import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuperheroeEditComponent } from './superheroe-edit.component';
import { FileApiService } from '../../services/file-api.service';
import { SuperheroesApiService } from '../../services/superheroes-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { Superheroe } from '../../models/superheroe.interface';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('SuperheroeEditComponent', () => {
    let component: SuperheroeEditComponent;
    let fixture: ComponentFixture<SuperheroeEditComponent>;
    let fileApiServiceMock: any;
    let superheroesServiceMock: any;
    let activatedRouteMock: any;
    let snackBarMock: any;
    let routerMock: any;
    let superheroe: Superheroe;


    beforeEach(() => {
        superheroe = { id: '123', realName: 'Juan López Fernández', nickName: 'Superlópez', avatar: 'superman.png', superpowers: ['superintuición'], team: 'DC' };

        fileApiServiceMock = {
            uploadFile: jasmine.createSpy('uploadFile').and.returnValue(of('new-superlopez-file.png'))
        };

        superheroesServiceMock = {
            editSuperheroe: jasmine.createSpy('editSuperheroe').and.returnValue(of({}))
        };

        activatedRouteMock = {
            snapshot: {
                data: { superheroe }
            },
            parent: {
                url: 'parent-url'
            }
        };

        snackBarMock = {
            open: jasmine.createSpy('open')
        };

        routerMock = {
            navigate: jasmine.createSpy('navigate')
        };
    })


    beforeEach( () => {
         TestBed.configureTestingModule({
            imports: [SuperheroeEditComponent, 
                      AngularFireModule.initializeApp(environment.firebaseConfig),
                      AngularFirestoreModule,
                      NoopAnimationsModule
                    ],
            providers: [
                FormBuilder,
                { provide: FileApiService, useValue: fileApiServiceMock },
                { provide: SuperheroesApiService, useValue: superheroesServiceMock },
                { provide: ActivatedRoute, useValue: activatedRouteMock },
                { provide: MatSnackBar, useValue: snackBarMock },
                { provide: Router, useValue: routerMock }
            ]
        })
            .compileComponents();
    });
    beforeEach(() => {
        fixture = TestBed.createComponent(SuperheroeEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('Se debe inicializar el componente con la data obtenida en el constructor (obtenida por el resolver)', () => {
        expect(component.superheroeControl.value).toEqual(superheroe);
    });

    it('Cuando hagamos click en guardar el servicio editSuperheroe ha de ser llamado', () => {
        component.onSubmit();
        expect(superheroesServiceMock.editSuperheroe).toHaveBeenCalledWith(superheroe.id, superheroe);
    });

    it('Cuando hagamos click en el botón de guardar y el avatar haya sido modificado se debe llamar a la función uploadFile del servicio fileApiServiceMock', () => {
        const newSuperheroe = { ...superheroe, avatar: 'new-superlopez-file' };
        component.superheroeControl.setValue(newSuperheroe);
        component.onSubmit();
        expect(fileApiServiceMock.uploadFile).toHaveBeenCalledWith('new-superlopez-file');
        expect(superheroesServiceMock.editSuperheroe).toHaveBeenCalledWith(superheroe.id, { ...newSuperheroe, avatar: 'new-superlopez-file.png' });
    });
});