
import { CommonModule} from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { SuperpowerNewDialogComponent } from "./superpower-new-dialog.component";
import { SuperpowerApiService } from "src/app/modules/superheroes/services/superpower-api.service";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { of } from "rxjs";

describe('SuperpowerNewDialogComponent', () => {
    let component: SuperpowerNewDialogComponent;
    let fixture: ComponentFixture<SuperpowerNewDialogComponent>;
    let superpowerApiServiceSpy: jasmine.SpyObj<SuperpowerApiService>;
    let matDialogRefSpy: jasmine.SpyObj<MatDialogRef<SuperpowerNewDialogComponent>>;
    

    beforeEach(waitForAsync(()=>{
        const spy = jasmine.createSpyObj('SuperpowerApiService', ['addSuperpower']);
        const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                SuperpowerNewDialogComponent,
                MatDialogModule,
                NoopAnimationsModule
            ],
            providers: [{ provide: MatDialogRef, useValue: {} }, { provide: SuperpowerApiService, useValue: spy }, { provide: MatDialogRef, useValue: dialogRefSpy }],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        }).compileComponents();
        superpowerApiServiceSpy = TestBed.inject(SuperpowerApiService) as jasmine.SpyObj<SuperpowerApiService>;
        matDialogRefSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<SuperpowerNewDialogComponent>>;
    }))
        
    beforeEach(() => {
        fixture = TestBed.createComponent(SuperpowerNewDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });


    it('should create', () => {
        expect(component).toBeTruthy();
    })

    it('El formulario debe ser inválido cuando no tiene valor y válido cuando si lo tiene', () => {
        expect(component.superpowerControl.valid).toBeFalsy();
        component.superpowerControl.setValue('Flying');
        expect(component.superpowerControl.valid).toBeTruthy();
    });

    it('Cuando se haga click en el botón y se llame a addSuperpower, se debe llamar a la función addSuperpower del servicio se superpowers y cerrar el dialog', () => {
        component.superpowerControl.setValue('Volar');
        const addSuperpowerSpy = superpowerApiServiceSpy.addSuperpower.and.returnValue(of(null));
        component.addSuperpower();
        expect(addSuperpowerSpy).toHaveBeenCalledWith('Volar');
        expect(matDialogRefSpy.close).toHaveBeenCalledWith('Volar');
    });
})