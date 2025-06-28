import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private baseUrl = 'http://localhost:3000/expense';

  private csvUrl = 'http://localhost:3000/csv'
  

  constructor(private http : HttpClient) { }

getExpense() : Observable <any>{
  return this.http.get(`${this.baseUrl}/getExpense` , this.getToken());
};

addExpense(expense : any){
 return this.http.post(`${this.baseUrl}/addExpense` , expense , this.getToken()).pipe(
    catchError((error) => {
      console.error('Add Expense Error:', error);
      return throwError(() => error);
    })
  );
};

deleteExpense(id : string){
 return this.http.delete(`${this.baseUrl}/deleteExpense?id=${id}` , this.getToken())
}

updateExpense( id : string , expense : any){
 return this.http.put(`${this.baseUrl}/updateExpense?id=${id}` , expense , this.getToken() )
}

getToken(){
    const token = localStorage.getItem('token')
    return {
      headers: new HttpHeaders().set('Authorization' , `Bearer ${token}`)
    }
  }

  importCsvFile( file : File){
    const formData = new FormData;
     formData.append('file',file);

    return this.http.post(`${this.csvUrl}/import`,formData , this.getToken());
  }

}
