import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { of } from 'rxjs';
import { SuperpowerApiService } from 'src/app/modules/superheroes/services/superpower-api.service';
import { SuperpowerSelectComponent } from './superpower-select.component';
import { SuperPower } from 'src/app/modules/superheroes/models/superpower.interface';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('SuperpowerSelectComponent', () => {
    let component: SuperpowerSelectComponent;
    let fixture: ComponentFixture<SuperpowerSelectComponent>;
    let superpowerApiServiceSpy: jasmine.SpyObj<SuperpowerApiService>;

    beforeEach(waitForAsync(() => {
        const spy = jasmine.createSpyObj('SuperpowerApiService', ['getSuperpowers']);

        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                MatFormFieldModule,
                MatSelectModule,
                SuperpowerSelectComponent,
                NoopAnimationsModule
            ],
            providers: [
                { provide: SuperpowerApiService, useValue: spy },
            ],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();

        superpowerApiServiceSpy = TestBed.inject(SuperpowerApiService) as jasmine.SpyObj<SuperpowerApiService>;
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SuperpowerSelectComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('En el AfterViewInit se deben cargar los superpowers', () => {
        const mockSuperpowers: SuperPower[] = [
            { text: 'Supervelocidad' },
            { text: 'Superfuerza' },
        ];
        superpowerApiServiceSpy.getSuperpowers.and.returnValue(of(mockSuperpowers));
        component.ngAfterViewInit();
        expect(superpowerApiServiceSpy.getSuperpowers).toHaveBeenCalled();
        fixture.detectChanges();
        expect(component.superpowers).toEqual(mockSuperpowers);
    });

    it('Cuando se introduzca se ejecuta writeValue con un valor como argumento, se debe setear el valor en el control superpowersControl', () => {
        const selectedSuperpowers = ['Supervelocidad', 'Superfuerza'];
        component.writeValue(selectedSuperpowers);
        expect(component.superpowersControl.value).toEqual(selectedSuperpowers);
    });

    it('Cuando se ejecute elo método superpowerAdded, el nuevo superpoder debe formar parte de los el array de suerpowers y estar seleccionado ', () => {
        const mockSuperpowers: SuperPower[] = [
            { text: 'Supervelocidad' },
            { text: 'Superfuerza' },
        ];
        superpowerApiServiceSpy.getSuperpowers.and.returnValue(of(mockSuperpowers));
        component.ngAfterViewInit();
        fixture.detectChanges();
        component.superpowerAdded('Invisibilidad');
        fixture.detectChanges();
        expect(component.superpowersControl.value).toContain('Invisibilidad');
    }); 
});