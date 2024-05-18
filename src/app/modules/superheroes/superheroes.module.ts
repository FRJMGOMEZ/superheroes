import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { superheroeEditResolver } from './pages/superheroe-edit/resolvers/superheroe-edit.resolver';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'search',
        loadComponent: () =>
          import('./pages/superheroes-search/superheroes-search.component').then(
            (c) => c.SuperheroesSearchComponent
          ),
      },
      {
        path: 'new',
        loadComponent: () =>
          import('./pages/superheroe-new/superheroe-new.component').then(
            (c) => c.SuperheroeNewComponent
          ),
      },
      {
        path: 'edit/:superheroeId',
        loadComponent: () =>
          import('./pages/superheroe-edit/superheroe-edit.component').then(
            (c) => c.SuperheroeEditComponent
          ),
          resolve: { superheroe: superheroeEditResolver }
      },
      {
        path:'',
        redirectTo:'search',
        pathMatch:'full'
      }
    ]),
  ],
})
export class SuperheroesModule {}
