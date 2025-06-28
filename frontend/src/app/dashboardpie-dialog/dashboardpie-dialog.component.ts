import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-dashboardpie-dialog',
  standalone: false,
  templateUrl: './dashboardpie-dialog.component.html',
  styleUrl: './dashboardpie-dialog.component.css'
})
export class DashboardpieDialogComponent {

   constructor( private router: Router, @Inject(MAT_DIALOG_DATA) public data: ChartData<'pie'> , 
   private dialogRef: MatDialogRef<DashboardpieDialogComponent>) {}

  navigateToAddExpense() {
    this.dialogRef.close();
    this.router.navigate(['/expense/addExpense']);
  }

  backToHome(){
    this.router.navigate(['/dashboard'])
    this.dialogRef.close();
  }

}
