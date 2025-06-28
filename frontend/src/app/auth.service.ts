import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {jwtDecode} from  'jwt-decode'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 
  private baseUrl : string ='http://localhost:3000/auth'

  constructor(private http: HttpClient, private router: Router) {}

  login(userData: any) {
    return this.http.post(`${this.baseUrl}/login`, userData)
  };

  register(userData: any) {
    return this.http.post(`${this.baseUrl}/register`, userData)
  };


  setToken(token: string) {
    localStorage.setItem('token', token)
  };

  getToken(): string | null {
    return localStorage.getItem('token')
  }

 getUserId(): string | null {
  const token = localStorage.getItem('token');
  if (!token || token.split('.').length !== 3) {
    return null;
  }

  try {
    const decoded: any = jwtDecode(token);
    return decoded.userId;
  } catch (err) {
    console.error('Invalid token:', err);
    return null;
  }
}


  logOut(){
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login'])
  }

  isLoggedIn() : boolean {
    return !!this.getToken();
  }



}
