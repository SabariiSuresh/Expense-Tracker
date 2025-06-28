import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private lodaderObject = new BehaviorSubject<boolean>(false);
  loder$ = this.lodaderObject.asObservable();
  private request = 0;

  show() {
    this.request++;
    this.lodaderObject.next(true);
  }

  hide(){
    this.request--;
    if(this.request <=0){
      this.lodaderObject.next(false);
      this.request = 0 ;
    }
  }

}
