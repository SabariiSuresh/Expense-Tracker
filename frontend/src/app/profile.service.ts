import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private baseUrl = environment.apiUrl + '/profile';

  constructor(private http : HttpClient) { }

  getProfile(){
   return this.http.get(`${this.baseUrl}/getUser`)
  }

  updateProfile(data : any){
   return this.http.put(`${this.baseUrl}/updateUser`,data)
  }


}
