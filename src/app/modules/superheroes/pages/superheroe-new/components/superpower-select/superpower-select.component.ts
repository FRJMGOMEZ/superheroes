import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, forwardRef, inject } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { SuperPower } from 'src/app/modules/superheroes/models/superpower.interface';
import { SuperpowerApiService } from 'src/app/modules/superheroes/services/superpower-api.service';

@Component({
  selector: 'app-superpower-select',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule
  ],
  template: `
     <mat-form-field>
        <mat-label></mat-label>
       <mat-select ngModel (ngModelChange)="onChange($event)" multiple> 
            <mat-option *ngFor="let superpower of superpowers" [value]="superpower.text">{{superpower.text}}</mat-option>
        </mat-select>
</mat-form-field>
  `,
  styleUrls: ['./superpower-select.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SuperpowerSelectComponent),
      multi: true,
    },
  ],
})
export class SuperpowerSelectComponent implements ControlValueAccessor {

  superpowersApiService = inject(SuperpowerApiService);
  superpowers:SuperPower[] = [];
  onChange: any = () => { };
  
  onTouch: any = () => {};
  
  writeValue(_) {}
  
  registerOnChange(fn: any) {
  this.onChange = fn;
  }
  
  registerOnTouched(fn: any) {
  this.onTouch = fn;
  }

  constructor(){
    this.superpowersApiService.getSuperpowers().subscribe((superpowers:SuperPower[])=>{
     this.superpowers = superpowers;
    });
  }
}
