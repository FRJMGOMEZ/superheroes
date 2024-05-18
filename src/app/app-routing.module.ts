import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'superheroes',
    loadChildren:() => import ('./modules/superheroes/superheroes.module').then(m => m.SuperheroesModule )
  },
  {
    path:'',
    redirectTo:'superheroes',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
