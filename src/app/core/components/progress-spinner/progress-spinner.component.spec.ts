import { ProgressSpinnerComponent } from "./progress-spinner.component"
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgressSpinnerService } from "./progress-spinner.service";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";


describe('ProgressSpinner Component',()=>{
    let component:ProgressSpinnerComponent;
    let fixture:ComponentFixture<ProgressSpinnerComponent>;
    let progressSpinnerService:ProgressSpinnerService;

    beforeEach(()=>{
        TestBed.configureTestingModule({
            imports:[ProgressSpinnerComponent],
            providers:[ProgressSpinnerService],
            schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        }).compileComponents(); 
    })

    beforeEach(()=>{
        fixture = TestBed.createComponent(ProgressSpinnerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    beforeEach(()=>{
        progressSpinnerService = fixture.debugElement.injector.get(ProgressSpinnerService); 
    })

    it('should create',()=>{
        expect(component).toBeTruthy();
    })

    it('Cuando se ejecute el método show del servicio, el resultado del observable del show$, debe ser true',(done)=>{
        progressSpinnerService.show();
        component.show$.subscribe((show)=>{
            expect(show).toBeTrue();
            done();
        });   
    })

    it('Cuando se ejecute el método hide del servicio, el resultado del observable del show$, debe ser false', (done) => {
        progressSpinnerService.hide();
        component.show$.subscribe((show) => {
            expect(show).toBeFalse();
            done();
        });
    })
})