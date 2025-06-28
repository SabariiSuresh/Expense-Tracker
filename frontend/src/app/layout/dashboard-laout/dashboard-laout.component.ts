import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProfileComponent } from '../../profile/profile/profile.component';


@Component({
  selector: 'app-dashboard-laout',
  standalone: false,
  templateUrl: './dashboard-laout.component.html',
  styleUrl: './dashboard-laout.component.css'
})
export class DashboardLaoutComponent {

  constructor(private router: Router , private dialog : MatDialog) { }

  openProfile(){
    this.dialog.open(ProfileComponent , {
      width : '400px' ,
      disableClose : true
    })
  }

  logOut() {
    localStorage.removeItem('token'),
      this.router.navigate(['auth/login'])
  }

}
