import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

private  baseUrl = 'http://localhost:3000/dashboard'
 private expenseUrl = 'http://localhost:3000/expense';

  constructor(private http : HttpClient) { }

  getExpense() : Observable <any>{
  return this.http.get(`${this.expenseUrl}/getExpense` , this.getToken());
};

deleteExpense(id : string){
 return this.http.delete(`${this.expenseUrl}/deleteExpense?id=${id}` , this.getToken())
}

updateExpense( id : string , expense : any){
 return this.http.put(`${this.expenseUrl}/updateExpense?id=${id}` , expense , this.getToken() )
}
   getToken(){
    const token = localStorage.getItem('token')
    return {
      headers: new HttpHeaders().set('Authorization' , `Bearer ${token}`)
    }
  }

  getSummary(): Observable <any>{
   return this.http.get<any>(`${this.baseUrl}/getSummary` , this.getToken())
  };

   getMonthlySummary(): Observable <any>{
   return this.http.get<any>(`${this.baseUrl}/getMonthly` , this.getToken())
  };

 getStatus() : Observable <any>{
    return this.http.get<any>(`${this.baseUrl}/getStatus` , this.getToken())
  }
}
