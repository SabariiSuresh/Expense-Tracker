import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-expence-edit-daialod',
  standalone: false,
  templateUrl: './expence-edit-daialod.component.html',
  styleUrl: './expence-edit-daialod.component.css'
})
export class ExpenceEditDaialodComponent {


  categories: string[] = ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Health', 'Other'];
   payments: string[] = [ 'Cash' , 'Online-Payment' , 'Card-Payment' ];
  success = '';
  error = '';


    constructor( private dashboardService : DashboardService , public dialogRef: MatDialogRef<ExpenceEditDaialodComponent> , @Inject(MAT_DIALOG_DATA) public data: any) {}

  cancel(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.success = '';
    this.error = '';
     this.dashboardService.updateExpense(this.data._id , this.data).subscribe({
      next : ()=>{
        this.success = 'Expense Updated';
       setTimeout(()=> this.dialogRef.close(this.data),2000)
        
      } , 
      error : (err) => {
        this.error = 'Updation Failed';
    
      }
    })


     
  }

}
