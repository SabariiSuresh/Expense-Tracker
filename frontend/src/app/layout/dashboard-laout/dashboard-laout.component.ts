import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProfileComponent } from '../../profile/profile/profile.component';


@Component({
  selector: 'app-dashboard-laout',
  standalone: false,
  templateUrl: './dashboard-laout.component.html',
  styleUrl: './dashboard-laout.component.css'
})
export class DashboardLaoutComponent implements OnInit{

  isLoggedIn : boolean = false;

  constructor(private router: Router , private dialog : MatDialog) { }
  
  ngOnInit(): void {
    this.checkStatus();
  }

  openProfile(){
    this.dialog.open(ProfileComponent , {
      width : '400px' ,
      disableClose : true
    })
  }

  checkStatus(){
    this.isLoggedIn = !!localStorage.getItem('token');
  }

  login(){
    this.router.navigate(['/auth/login'])
  }

  logOut() {
    localStorage.removeItem('token')
    this.router.navigate(['/dashboard'])
  }

}
