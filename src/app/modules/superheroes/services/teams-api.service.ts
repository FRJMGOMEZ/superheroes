import { Injectable, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { SuperheroeTeam } from '../models/superheroe-team.interface';

@Injectable({
  providedIn: 'root'
})
export class TeamsApiService {

  private firestore = inject(AngularFirestore);

  getTeams():Observable<SuperheroeTeam[]>{
    return this.firestore.collection<SuperheroeTeam>('teams').valueChanges();
  }

}
