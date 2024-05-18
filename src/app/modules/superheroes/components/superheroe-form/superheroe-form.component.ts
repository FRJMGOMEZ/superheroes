import { ChangeDetectionStrategy, Component, OnDestroy, forwardRef, inject } from '@angular/core';
import { FormBuilder, Validators,  ReactiveFormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor, FormGroup, NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SuperpowerSelectComponent } from './superpower-select/superpower-select.component';
import { TeamSelectorComponent } from './team-selector/team-selector.component';
import { UploadAvatarComponent } from './upload-avatar/upload-avatar.component';
import { Subscription } from 'rxjs';
import { Superheroe } from '../../models/superheroe.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-superheroe-form',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    TeamSelectorComponent,
    SuperpowerSelectComponent,
    UploadAvatarComponent,
    MatSnackBarModule
  ],
  templateUrl:'./superheroe-form.component.html',
  styleUrls: ['./superheroe-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SuperheroeFormComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => SuperheroeFormComponent),
      multi: true,
    }
  ],
})
export class SuperheroeFormComponent implements ControlValueAccessor, Validator, OnDestroy {
  private fb = inject(FormBuilder);
  superheroeForm:FormGroup;
  superheroesChangesSubscription:Subscription;
  get nameGroup():FormGroup{
    return this.superheroeForm?.controls['name'] as FormGroup;
  }
  ngOnDestroy(){
    this.superheroesChangesSubscription.unsubscribe();
  }
  validate() {
     return this.superheroeForm.invalid ? {invalid:true} : null;
  }
  onChange: any = () => { };

  onTouch: any = () => { };

  writeValue(superheroe:Superheroe) {
    this.setForm(superheroe);
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

  setForm(superheroe:Superheroe){
    this.superheroeForm = this.fb.group({
      name: this.fb.group({
        realName: this.fb.control(superheroe?.realName),
        nickName: this.fb.control(superheroe?.nickName, Validators.required),
      }),
      team: this.fb.control(superheroe?.team, Validators.required),
      superpowers: this.fb.control(superheroe?.superpowers || null, Validators.required),
      avatar: this.fb.control(superheroe?.avatar, Validators.required)
    });
    this.listenSuperheroChanges();
  }

  private listenSuperheroChanges(){
   this.superheroesChangesSubscription =  this.superheroeForm.valueChanges.subscribe((value)=>{
         this.onChange(value);
    })
  }
  
}
