import { Component } from '@angular/core';
import { ProfileService } from '../../profile.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  profile = {

    name: '',
    userName: '',
    email: ''

  }

  isEdit = false;
  errorMessage = ''
  successMessage = '';
  constructor(private profileservice: ProfileService, private dialogRef: MatDialogRef<ProfileComponent>, private router: Router) { }

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile() {
    this.profileservice.getProfile().subscribe({
      next: (data: any) => this.profile = data,
      error: (err) => {

        if (err.status === 401) {
          this.errorMessage = 'You must be login to view your profile';
        } else {
          this.errorMessage = 'Failed to load profile';
        }
        console.error('profile load eror', err);
      }
    })
  }

  home() {
    this.dialogRef.close();
    this.router.navigate(['/dashboard']);
  }

  closeDialog() {
    this.dialogRef.close();
  }

  isEditOn() {
    this.isEdit = true;
  }

  isEditOff() {
    this.isEdit = false;
    this.loadProfile();
  }

  onSubmit() {
    this.profileservice.updateProfile(this.profile).subscribe({
      next: () => {
        this.successMessage = "Profile updated Successfully";
        setTimeout(() => {
          this.isEdit = false
        }, 2000);
        this.errorMessage = '';
      },
      error: (err) => {
        this.successMessage = '';
        if (err.status === 409 && err.error?.message) {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage = err.error?.message || 'Update Failed';
        }

      }
    })
  }
}
