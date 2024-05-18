import { Injectable, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { SuperHeroeWrite } from '../models/superheroe-write.interface';
import { Observable, from, map, tap } from 'rxjs';
import { Superheroe } from '../models/superheroe.interface';

@Injectable({
  providedIn: 'root'
})
export class SuperheroesApiService {

  private firestore = inject(AngularFirestore)

  getSuperheroes(): Observable<Superheroe[]> {
    return this.firestore.collection<Superheroe>('superheroes').snapshotChanges().pipe(map((changes) => {
      return changes.map((e) => ({
        id: e.payload.doc.id,
        realName: e.payload.doc.data()["name"]?.realName,
        nickName: e.payload.doc.data()["name"]?.nickName,
        team: e.payload.doc.data()["team"],
        superpowers: e.payload.doc.data()["superpowers"],
        avatar: e.payload.doc.data()["avatar"]
      }))
    }));
  }

  getSuperheroeById(id: string):Observable<Superheroe>{
   const doc = this.firestore.collection('superheroes').doc(id).get();
   return doc.pipe(map(snapshot => snapshot.data()),map((dbSuperheroe:any)=>
      (
        {
       id,
       realName: dbSuperheroe.name.realName,
       nickName: dbSuperheroe.name.nickName,
       team:dbSuperheroe.team,
       superpowers: dbSuperheroe.superpowers,
       avatar: dbSuperheroe.avatar
        }
      )  
   ))
  }

  addSuperheroe(superheroe: SuperHeroeWrite) {
    return this.firestore.collection('superheroes').add(superheroe);
  }

  editSuperheroe(id:string,superheroe:SuperHeroeWrite){
    return this.firestore.collection('superheroes').doc(id).update(superheroe);
  }

  removeSuperheroe(id:string){
    return from(this.firestore.collection('superheroes').doc(id).delete());
  }
}
