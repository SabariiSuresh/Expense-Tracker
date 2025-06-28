import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private baseUrl = 'http://localhost:3000/profile';

  constructor(private http : HttpClient) { }

  getProfile(){
   return this.http.get(`${this.baseUrl}/getUser`)
  }

  updateProfile(data : any){
   return this.http.put(`${this.baseUrl}/updateUser`,data)
  }


}
