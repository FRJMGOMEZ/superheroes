import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, inject } from '@angular/core';
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
import { Subscription, debounceTime } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';


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
    ReactiveFormsModule
  ],
  templateUrl:'./superheroes-search.component.html',
  styleUrls: ['./superheroes-search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuperheroesSearchComponent implements AfterViewInit, OnDestroy{
  private cdr = inject(ChangeDetectorRef);
  private superheroesApiService = inject(SuperheroesApiService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private ar = inject(ActivatedRoute);

  displayedColumns: string[] = ['avatar','realName', 'nickName', 'team', 'superpowers','edit'];
  dataSource:MatTableDataSource<Superheroe>;
  filterControl:FormControl = this.fb.control('');
  private filterChangeSubscription:Subscription;
  constructor() {
      this.superheroesApiService.getSuperheroes().subscribe(superheroes => {
        this.dataSource = new MatTableDataSource(superheroes);
        this.cdr.detectChanges();
        this.setFilterPredicate();
      });
  }

  ngAfterViewInit(){
    this.listenFilterChange();
  }

  ngOnDestroy(){
    this.filterChangeSubscription.unsubscribe();
  }

  private setFilterPredicate(){
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

  private listenFilterChange(){
    this.filterChangeSubscription = this.filterControl.valueChanges.pipe(debounceTime(300)).subscribe((filterValue:string)=>{
       const input = filterValue.trim().toLowerCase();
       this.dataSource.filter = input;
     })
  }

  navigateToEdition(id:string){
   this.router.navigate([`edit/${id}`],{relativeTo:this.ar.parent});
  }
}
