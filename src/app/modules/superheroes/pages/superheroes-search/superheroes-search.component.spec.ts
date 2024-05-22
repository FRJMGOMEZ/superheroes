import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuperheroesSearchComponent } from './superheroes-search.component';
import { SuperheroesApiService } from '../../services/superheroes-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ShowAvatarComponent } from '../../components/show-avatar/show-avatar.component';
import { MatButtonModule } from '@angular/material/button';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Superheroe } from '../../models/superheroe.interface';

describe('SuperheroesSearchComponent', () => {
    let component: SuperheroesSearchComponent;
    let fixture: ComponentFixture<SuperheroesSearchComponent>;
    let superheroesApiServiceMock: any;
    let dialogMock: any;
    let snackBarMock: any;
    let routerMock: any;
    let activatedRouteMock: any;

    beforeEach(async () => {
        superheroesApiServiceMock = {
            getSuperheroes: jasmine.createSpy('getSuperheroes').and.returnValue(of([
                { id: '1', realName: 'Juan López Fernández', nickName: 'Superlópez', avatar: 'superlopez.png', superpowers: ['superintuición'], team: 'Marvel' },
                { id: '2', realName: 'Clark Kent', nickName: 'Superman', team: 'DC', superpowers: ['volar', 'superfuerza'], avatar: 'superman.png' }
            ])),
            removeSuperheroe: jasmine.createSpy('removeSuperheroe').and.returnValue(of({}))
        };

        dialogMock = {
            open: jasmine.createSpy('open').and.returnValue({
                afterClosed: () => of(true)
            })
        };

        snackBarMock = {
            open: jasmine.createSpy('open')
        };

        routerMock = {
            navigate: jasmine.createSpy('navigate')
        };

        activatedRouteMock = {
            parent: {
                url: 'parent-url'
            }
        };

        await TestBed.configureTestingModule({
            imports: [
                MatTableModule,
                MatPaginatorModule,
                MatFormFieldModule,
                MatInputModule,
                MatIconModule,
                ReactiveFormsModule,
                MatDialogModule,
                MatButtonModule,
                MatSnackBarModule,
                NoopAnimationsModule,
                ShowAvatarComponent,
                SuperheroesSearchComponent
            ],
            providers: [
                FormBuilder,
                { provide: SuperheroesApiService, useValue: superheroesApiServiceMock },
                { provide: MatDialog, useValue: dialogMock },
                { provide: MatSnackBar, useValue: snackBarMock },
                { provide: Router, useValue: routerMock },
                { provide: ActivatedRoute, useValue: activatedRouteMock }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SuperheroesSearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('El array de superheroes, debe cargarse en el contructor', () => {
        expect(superheroesApiServiceMock.getSuperheroes).toHaveBeenCalled();
        expect(component.dataSource.data.length).toBe(2);
        expect(component.dataSource.data[0].nickName).toBe('Superlópez');
    });

    it('Cuando hacemos click en el botón de editar del lápiz debe llamarse el router para navegar a edición con el id del registro', () => {
        component.navigateToEdition('1');
        expect(routerMock.navigate).toHaveBeenCalledWith(['edit/1'], { relativeTo: activatedRouteMock.parent });
    });

    it('Comprobamos el correcto funcionamiento del filtro', () => {
        expect(component.dataSource.data.length).toBe(2);

        component.filterControl.setValue('superlópez');
        fixture.detectChanges();
        component.dataSource.filterPredicate = (item: Superheroe, filter: string) => {
            const searchText = filter.trim().toLowerCase();
            return item.nickName.toLowerCase().includes(searchText) ||
                item.realName.toLowerCase().includes(searchText) ||
                item.team.toLowerCase().includes(searchText) ||
                item.superpowers.some(sp => sp.toLowerCase().includes(searchText));
        };

        component.dataSource.filter = component.filterControl.value;
        expect(component.dataSource.filteredData.length).toBe(1);
        expect(component.dataSource.filteredData[0].nickName).toBe('Superlópez');
    });

});