import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DocumentReference } from '@angular/fire/compat/firestore';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, from, switchMap } from 'rxjs';
import { FileApiService } from '../../services/file-api.service';
import { SuperheroesApiService } from '../../services/superheroes-api.service';
import { MatButtonModule } from '@angular/material/button';
import { SuperheroeFormComponent } from '../../components/superheroe-form/superheroe-form.component';
import { Superheroe } from '../../models/superheroe.interface';

@Component({
  selector: 'app-superheroe-edit',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    SuperheroeFormComponent,
    FormsModule
  ],
  template: `
     <div class="superheroe-new-container">
  <h3>Puedes modificar las características de tu superhéroe o superheroína</h3>
  <app-superheroe-form *ngIf="superheroeControl" [formControl]="superheroeControl" />
  <button mat-button [disabled]="superheroeControl.invalid" (click)="onSubmit()">Guardar edición superheroe</button>
</div>

  `,
  styleUrls: ['./superheroe-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuperheroeEditComponent {
  private fileApiService = inject(FileApiService);
  private superheroesService = inject(SuperheroesApiService);
  private ar = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);
  private fb = inject(FormBuilder);
  superheroeControl:FormControl;
  private superheroeId:string;
  private originalAvatar:string;
  constructor(){
    const superheroe:Superheroe = this.ar.snapshot.data['superheroe'];
    this.superheroeId = superheroe.id;
    this.originalAvatar = superheroe.avatar;
    this.superheroeControl = this.fb.control(superheroe); 
  }

  onSubmit() {
    let obs:Observable<any>;
    if(this.originalAvatar !== this.superheroeControl.value.avatar){
      const file = this.superheroeControl.value.avatar;
      obs = this.fileApiService.uploadFile(file).pipe(switchMap((url) => {
        const newSuperheroe = { ...this.superheroeControl.value, avatar: url }
        return this.superheroesService.editSuperheroe(this.superheroeId, newSuperheroe);
      }));
    }else{
      obs = from(this.superheroesService.editSuperheroe(this.superheroeId, this.superheroeControl.value));
    }
     obs.subscribe(() => {
       this.snackBar.open('El superheroe se ha editado correctamente.');
     })
  }
}


