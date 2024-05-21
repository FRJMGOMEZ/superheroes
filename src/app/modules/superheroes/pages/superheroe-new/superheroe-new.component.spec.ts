import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuperheroeNewComponent } from './superheroe-new.component';
import { FileApiService } from '../../services/file-api.service';
import { SuperheroesApiService } from '../../services/superheroes-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { SuperheroeFormComponent } from '../../components/superheroe-form/superheroe-form.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';

describe('SuperheroeNewComponent', () => {
    let component: SuperheroeNewComponent;
    let fixture: ComponentFixture<SuperheroeNewComponent>;
    let fileApiServiceMock: any;
    let superheroesServiceMock: any;
    let activatedRouteMock: any;
    let snackBarMock: any;
    let routerMock: any;

    beforeEach(()=>{
        fileApiServiceMock = {
            uploadFile: jasmine.createSpy('uploadFile').and.returnValue(of('new-superlopez-url.png'))
        };

        superheroesServiceMock = {
            addSuperheroe: jasmine.createSpy('addSuperheroe').and.returnValue(of({}))
        };

        activatedRouteMock = {
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

    beforeEach(() => {
     TestBed.configureTestingModule({
            imports: [
                MatButtonModule,
                ReactiveFormsModule,
                MatSnackBarModule,
                NoopAnimationsModule,
                SuperheroeFormComponent,
                FormsModule,
                SuperheroeNewComponent ,
                AngularFireModule.initializeApp(environment.firebaseConfig),
                AngularFirestoreModule,
            ],
            providers: [
                FormBuilder,
                { provide: FileApiService, useValue: fileApiServiceMock },
                { provide: SuperheroesApiService, useValue: superheroesServiceMock },
                { provide: ActivatedRoute, useValue: activatedRouteMock },
                { provide: MatSnackBar, useValue: snackBarMock },
                { provide: Router, useValue: routerMock }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SuperheroeNewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('Se debe inicializar el componente', () => {
        expect(component.superheroeControl).toBeTruthy();
    });

    it('Se debe llamar a las funciones uploadFile (fileService) y addSuperheroe(superheroesService) cuando se haga click en el botón de crear', () => {
        const newSuperheroe = { name: 'Superlópez', avatar: 'new-superlopez-file' };
        component.superheroeControl.setValue(newSuperheroe);
        component.onSubmit();
        expect(fileApiServiceMock.uploadFile).toHaveBeenCalledWith('new-superlopez-file');
        expect(superheroesServiceMock.addSuperheroe).toHaveBeenCalledWith({ ...newSuperheroe, avatar: 'new-superlopez-url.png' });
    });
});