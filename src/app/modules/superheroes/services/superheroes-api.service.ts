import { Injectable, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { SuperHeroePost } from '../models/superheroe-post.interface';

@Injectable({
  providedIn: 'root'
})
export class SuperheroesApiService {

  private firestore = inject(AngularFirestore)

   getSuperheroes(){
    return this.firestore.collection('superheroes').valueChanges();
  }

  addSuperheroe(superheroe:SuperHeroePost){
     return this.firestore.collection('superheroes').add(superheroe);
  }

}
