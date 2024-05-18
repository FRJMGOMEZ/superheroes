import { Injectable, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuperpowerApiService {
  
  private firestore = inject(AngularFirestore)

  getSuperpowers(){
    return this.firestore.collection('superpowers').valueChanges();
  }

  addSuperpower(superpowerName:string){
      return from(this.firestore.collection('superpowers').add({text:superpowerName}));
  }

}
