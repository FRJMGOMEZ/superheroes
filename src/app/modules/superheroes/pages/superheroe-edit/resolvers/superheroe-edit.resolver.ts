import { inject } from '@angular/core';
import type { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { SuperheroesApiService } from '../../../services/superheroes-api.service';
import { Superheroe } from '../../../models/superheroe.interface';

export const superheroeEditResolver: ResolveFn<Superheroe> = (route:ActivatedRouteSnapshot) => {
  const superheroesApiService = inject(SuperheroesApiService);
  const superheroeId = route.params['superheroeId'];
  return superheroesApiService.getSuperheroeById(superheroeId)
};
