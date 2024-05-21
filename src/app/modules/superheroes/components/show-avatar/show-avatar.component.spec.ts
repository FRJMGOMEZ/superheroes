import { CommonModule, NgOptimizedImage } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ShowAvatarComponent } from "./show-avatar.component";
import { By } from "@angular/platform-browser";

describe('ShowAvatarComponent', () => {
    let component: ShowAvatarComponent;
    let fixture: ComponentFixture<ShowAvatarComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                NgOptimizedImage,
                ShowAvatarComponent
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        }).compileComponents();
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(ShowAvatarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    })

    it('cuando exista un valor en la propiedad file, el elemento img debe de renderizarse.',()=>{
        component.fileUrl = 'mock-url';
        fixture.detectChanges();
        const img = fixture.debugElement.query(By.css('img')); 
        expect(img).toBeTruthy();
    })

    it('cuando exista un valor en la propiedad link, el elemento img debe de renderizarse.', () => {
        component.link= 'mock-link';
        fixture.detectChanges();
        const img = fixture.debugElement.query(By.css('img'));
        expect(img).toBeTruthy();
    })
})