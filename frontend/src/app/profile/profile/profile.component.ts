import { Component } from '@angular/core';
import { ProfileService } from '../../profile.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

profile = {

  name : '',
  userName : '',
  email : ''

}

isEdit = false;
errorMessage =''
successMessage = '';
constructor(private profileservice : ProfileService , private dialogRef: MatDialogRef<ProfileComponent> ){}

 ngOnInit(): void {
    this.loadProfile();
  }

loadProfile(){
  this.profileservice.getProfile().subscribe({
    next : ( data : any )=> this.profile = data,
    error : ()=> alert("Faild to load profile")
  })
}

closeDialog() {
    this.dialogRef.close(); 
  }

isEditOn(){
  this.isEdit = true;
}

isEditOff(){
  this.isEdit = false;
  this.loadProfile();
}

onSubmit(){
  this.profileservice.updateProfile(this.profile).subscribe({
    next : ()=> {
      this.successMessage = "Profile updated Successfully";
       setTimeout( ()=>{
               this.isEdit = false
          },2000 );
      this.errorMessage = '';
    } ,
    error : (err)=> {
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
