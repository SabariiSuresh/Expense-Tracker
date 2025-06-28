import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AutoLogoutService {

  private timeOut : any;

  private readonly logOutTime = 60*60*1000;

  constructor(private router : Router , private ngZone : NgZone) { }

  initListner(){
    this.ngZone.runOutsideAngular(()=>{
      window.addEventListener('mousemove',()=> this.resetTimer()),
      window.addEventListener('mousedown',()=> this.resetTimer()),
      window.addEventListener('keypress',()=> this.resetTimer()),
      window.addEventListener('touchstart',()=> this.resetTimer()),
      window.addEventListener('scroll',()=> this.resetTimer())
    })
  }

  clearTimer(){
    if(this.timeOut){
      clearTimeout(this.timeOut)
    }
  }

  initTimer(){
    this.clearTimer();
    this.timeOut = setTimeout(()=> this.logOut() , this.logOutTime )
  }

  resetTimer(){
    this.clearTimer();
    this.initTimer();
  }

  logOut(){
    this.ngZone.run(()=>{
      
      localStorage.removeItem('token'),
      localStorage.removeItem('user')

      this.router.navigate(['/auth/login']);
      alert("you have been loged out due to inactivity")

    })
  }

  startwatching(){
    this.initListner();
    this.initTimer();
  }


stopwatching(){
  this.clearTimer();
}

}
