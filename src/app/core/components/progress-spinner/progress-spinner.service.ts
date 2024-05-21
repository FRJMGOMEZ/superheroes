import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressSpinnerService {

  private showSrc = new BehaviorSubject<boolean>(false);
  show$ = this.showSrc.asObservable();

  show(){
    this.showSrc.next(true);
  }

  hide(){
    this.showSrc.next(false);
  }

}
