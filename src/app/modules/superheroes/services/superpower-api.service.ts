import { Injectable, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class SuperpowerApiService {
  
  private firestore = inject(AngularFirestore)

  getSuperpowers(){
    return this.firestore.collection('superpowers').valueChanges();
  }

}
