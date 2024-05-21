import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { FileApiService } from '../../services/file-api.service';
import { SuperheroesApiService } from '../../services/superheroes-api.service';
import { catchError, switchMap } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SuperheroeFormComponent } from '../../components/superheroe-form/superheroe-form.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-superheroe-new',
  standalone: true,
  imports: [
    MatButtonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    SuperheroeFormComponent,
    FormsModule
  ],
  template: `
     <div class="superheroe-new-container">
  <h3>Bienvenido/a al nacimiento de un nuevo superhéroe o superheroína</h3>
  <app-superheroe-form [formControl]="superheroeControl" />
  <button mat-button [disabled]="superheroeControl.invalid" (click)="onSubmit()">Crear superheroe</button>
</div>

  ` ,
  styleUrls: ['./superheroe-new.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuperheroeNewComponent {
  private fileApiService = inject(FileApiService);
  private superheroesService = inject(SuperheroesApiService);
  private router = inject(Router);
  private ar = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);
  private fb = inject(FormBuilder);
  superheroeControl = this.fb.control(null);

  onSubmit() {
    const file = this.superheroeControl.value.avatar;
    this.fileApiService.uploadFile(file).pipe(switchMap((url) => {
      const newSuperheroe = { ...this.superheroeControl.value, avatar: url }
      return this.superheroesService.addSuperheroe(newSuperheroe);
    })).pipe(
        catchError(err => {
          this.snackBar.open('Se ha producido un error en el alta.');
          throw err;
        })
      )
    .subscribe(() => {
      this.snackBar.open('El superheroe se ha creado correctamente');
      this.router.navigate(['search'], { relativeTo: this.ar.parent });
    })
  }
}
