import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  forwardRef,
  inject,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { SuperPower } from 'src/app/modules/superheroes/models/superpower.interface';
import { SuperpowerApiService } from 'src/app/modules/superheroes/services/superpower-api.service';
import { SuperpowerNewComponent } from '../superpower-new/superpower-new.component';
import { Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-superpower-select',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatFormFieldModule, ReactiveFormsModule, SuperpowerNewComponent],
  template: `
    <mat-form-field>
      <mat-label>Selecciona sus superpoderes</mat-label>
      <mat-select *ngIf=" superpowers && superpowersControl" [required]="required" [formControl]="superpowersControl" multiple>
        <mat-option
          *ngFor="let superpower of superpowers"
          [value]="superpower.text"
          >{{ superpower.text }}</mat-option
        >
      </mat-select>
    </mat-form-field>
      <app-superpower-new (superpowerAdded)="superpowerAdded($event)" />
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
export class SuperpowerSelectComponent implements ControlValueAccessor, AfterViewInit {
  @Input() required: boolean;
  superpowersApiService = inject(SuperpowerApiService);
  private cdr = inject(ChangeDetectorRef);
  private fb = inject(FormBuilder);
  superpowers: SuperPower[] = [];
  superpowersControl: FormControl = this.fb.control([]);
  private superpowersChangeSubscription: Subscription;
  onChange: any = () => { };
  onTouch: any = () => { };

  ngAfterViewInit() {
    this.getSetSuperpowers.subscribe();
  }

  writeValue(superpowers: string[]) {
    this.superpowersControl.setValue(superpowers);
    this.listenSuerpowersChange();
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

  get getSetSuperpowers() {
    return this.superpowersApiService
      .getSuperpowers().pipe(tap((superpowers: SuperPower[]) => {
        this.superpowers = superpowers;
        this.cdr.detectChanges();
      }))
  }

  private listenSuerpowersChange() {
    this.superpowersChangeSubscription?.unsubscribe();
    this.superpowersChangeSubscription = this.superpowersControl.valueChanges.subscribe((superpowers) => {
      this.onChange(superpowers);
    })
  }

  superpowerAdded(newSuperpower: string) {
    this.getSetSuperpowers.subscribe(() => {
      this.superpowersControl.setValue([...this.superpowersControl.value, newSuperpower])
      this.cdr.detectChanges();
    })
  }
}
