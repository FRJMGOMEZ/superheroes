import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, TemplateRef, ViewChild, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SuperheroesApiService } from '../../services/superheroes-api.service';
import { Superheroe } from '../../models/superheroe.interface';
import { ShowAvatarComponent } from '../../components/show-avatar/show-avatar.component';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subscription, debounceTime, of, switchMap, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-superheroes-search',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    ShowAvatarComponent,
    MatIconModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './superheroes-search.component.html',
  styleUrls: ['./superheroes-search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuperheroesSearchComponent implements AfterViewInit, OnDestroy {

  @ViewChild('confirmRemoveDialogRef') confirmRemoveDialogRef: TemplateRef<any>;
  private cdr = inject(ChangeDetectorRef);
  private superheroesApiService = inject(SuperheroesApiService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private ar = inject(ActivatedRoute);
  private dialog = inject(MatDialog);
  private matSnackBar = inject(MatSnackBar);

  displayedColumns: string[] = ['avatar', 'realName', 'nickName', 'team', 'superpowers', 'edit', 'remove'];
  dataSource: MatTableDataSource<Superheroe>;
  filterControl: FormControl = this.fb.control('');
  private filterChangeSubscription: Subscription;
  superheroeAboutToDelete:Superheroe;

  get getSetSuperheroes() {
    return this.superheroesApiService.getSuperheroes().pipe(tap(superheroes => {
      this.dataSource = new MatTableDataSource(superheroes);
      this.cdr.detectChanges();
    }))
  }
  constructor() {
    this.getSetSuperheroes.subscribe(() => {
      this.setFilterPredicate();
    });
  }

  ngAfterViewInit() {
    this.listenFilterChange();
  }

  ngOnDestroy() {
    this.filterChangeSubscription.unsubscribe();
  }

  private setFilterPredicate() {
    this.dataSource.filterPredicate = (item: Superheroe, filter: string) => {
      let hasMatched = false;
      hasMatched = item.nickName.toLowerCase().includes(filter);
      hasMatched = !hasMatched ? item.realName.toLowerCase().includes(filter) : hasMatched;
      hasMatched = !hasMatched ? item.team.toLowerCase().includes(filter) : hasMatched;
      hasMatched = !hasMatched ? item.superpowers.reduce((matched, superpower) => {
        if (!matched) {
          superpower.toLowerCase().includes(filter);
        }
        return matched;
      }, false) : hasMatched;
      return hasMatched;
    }
  }

  private listenFilterChange() {
    this.filterChangeSubscription = this.filterControl.valueChanges.pipe(debounceTime(300)).subscribe((filterValue: string) => {
      const input = filterValue.trim().toLowerCase();
      this.dataSource.filter = input;
    })
  }

  navigateToEdition(id: string) {
    this.router.navigate([`edit/${id}`], { relativeTo: this.ar.parent });
  }

  removeSuperheroe(superheroe: Superheroe) {
    this.superheroeAboutToDelete = superheroe;
    this.dialog.open(this.confirmRemoveDialogRef).afterClosed().pipe(switchMap((remove:boolean) =>{
      this.superheroeAboutToDelete = null;
      return remove ? this.superheroesApiService.removeSuperheroe(superheroe.id).pipe(switchMap(() =>
        this.getSetSuperheroes
      )) : of(null)
    })
  ).subscribe(()=>{
        this.matSnackBar.open(`${superheroe.nickName} se ha eliminado correctamente.`)
    });
  }
}
