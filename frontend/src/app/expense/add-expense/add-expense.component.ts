import { Component } from '@angular/core';
import { ExpenseService } from '../../expense.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-expense',
  standalone: false,
  templateUrl: './add-expense.component.html',
  styleUrl: './add-expense.component.css'
})
export class AddExpenseComponent {


  expense: any = {
    name: '',
    amount: '',
    category: '',
    paymentType: '',
    date: '',
    comments: ''
  }

   selectedFile: File | null = null;
  message = '';
  successMessage = '';
  errorMessage = '';

  categories: string[] = ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Health', 'Other' ];
   payments: string[] = [ 'Cash' , 'Online-Payment' , 'Card-Payment' ];

  constructor(private expenseService: ExpenseService , private router : Router ) { }

  onSubmit() {
    this.expenseService.addExpense(this.expense).subscribe({
      next: () => {
        this.successMessage = 'Expense added successfully'
      },
      error: () => 
        this.errorMessage = 'Faild to add expense'
    });
  }

  reset(){
    this.expense = {
    name: '',
    amount: '',
    category: '',
    paymentType: '',
    date: '',
    comments: ''
  }
  ,
   this.successMessage = '';
  this.errorMessage = '';
  }

  home(){
    this.router.navigate(['/dashboard'])
  }

  
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.message = '';
  }

downloadUserExpenses() {
    this.expenseService.getExpense().subscribe({
      next: (expenses: { name: any; amount: any; date: string | number | Date; category: any; }[]) => {
        if (!expenses || expenses.length === 0) {
          this.message = 'No expenses found to download.';
          return;
        }

        const headers = ['name', 'amount', 'date', 'category'];

        const csvRows = expenses.map((exp: { name: any; amount: any; date: string | number | Date; category: any; }) =>
          [
            exp.name ?? '',
            exp.amount ?? '',
            exp.date ? new Date(exp.date).toISOString().slice(0, 10) : '',
            exp.category ?? '',
          ].join(',')
        );

        const csvContent = [headers.join(','), ...csvRows].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'my-expenses.csv';
        a.click();
        window.URL.revokeObjectURL(url);
        this.message = 'Expense Downloded'
      },
      error: (err) => {
        this.message = 'Failed to fetch expenses for download.';
        console.error(err);
      },
    });
  }

  upload() {
    if (!this.selectedFile) return;

    this.expenseService.importCsvFile(this.selectedFile).subscribe({
      next: (res: any) => {
        this.message = res.message + ', Total records: ' + res.count;
        this.selectedFile = null; 
      },
      error: (err) => {
        this.message = 'Upload failed. Please try again.';
        this.selectedFile = null; 
      },
    });
  }

}
