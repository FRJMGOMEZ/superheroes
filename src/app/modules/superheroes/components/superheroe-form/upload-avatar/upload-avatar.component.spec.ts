import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UploadAvatarComponent } from './upload-avatar.component';
import { ShowAvatarComponent } from 'src/app/modules/superheroes/components/show-avatar/show-avatar.component';

describe('UploadAvatarComponent', () => {
    let component: UploadAvatarComponent;
    let fixture: ComponentFixture<UploadAvatarComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                MatButtonModule,
                MatIconModule,
                FormsModule,
                UploadAvatarComponent,
                ShowAvatarComponent
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UploadAvatarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('El valor de la propiedad link debe ser igual al valor del argumento del método writeValue', () => {
        component.writeValue('mock-link');
        expect(component.link).toBe('mock-link');
    });

    it('Cuando se haga click sobre el botón para seleccionar una imagen se debe hacer click sobre el input de tipo file para que se abra la selcción de archivos', () => {
        const fileInput = fixture.nativeElement.querySelector('input');
        spyOn(fileInput, 'click');
        const button = fixture.nativeElement.querySelector('button');
        button.click();
        expect(fileInput.click).toHaveBeenCalled();
    });
});