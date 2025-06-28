import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  message = '';
  errorMessage = '';
  successMessage = '';
  loginForm!: FormGroup
  hidePassword = true;

  constructor(private form: FormBuilder, private authService: AuthService, private router: Router) { }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
  
  ngOnInit(): void {

    this.loginForm = this.form.group({

      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),

    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (res: any) => {
          this.authService.setToken(res.user.token);
          this.successMessage = 'Login Successfully'
          this.errorMessage = '';
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 2000)
        },
        error: err => {
          this.errorMessage = err.error?.message || 'Login failed';
        }
      })
    }
  }

}