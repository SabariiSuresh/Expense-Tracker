import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import { ChartConfiguration } from 'chart.js';
import { ExpenceEditDaialodComponent } from '../../expense/expence-edit-daialod/expence-edit-daialod.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { DashboardpieDialogComponent } from '../../dashboardpie-dialog/dashboardpie-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-overview',
  standalone: false,
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent implements OnInit {

  summary: any[] = [];

  firstDate: string | null = null;
  lastDate: string | null = null;
  totalAmount: number = 0;
  totalCount: number = 0;
  showAddExpenseButton : boolean = false;

  pieChartData: ChartConfiguration<'pie'>['data'] = { labels: [], datasets: [{ data: [] }] };
  barChartData: ChartConfiguration<'bar'>['data'] = { labels: [], datasets: [{ label: 'Expenses', data: [] }] };
  pieChartLabels: any;

  constructor(private dashboardService: DashboardService, private dialog: MatDialog , private router : Router  , private snackBar : MatSnackBar) { }

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.loadSummary();
    this.loadStatus();
    this.loadMonthlySummary();
    this.loadExpenses();
  }

  loadSummary() {
    this.dashboardService.getSummary().subscribe({
      next: (data) => {
        this.summary = data;

        if(data.length === 0){

          this.pieChartData = {
            labels : ['No Data'],
            datasets : [{data : [1] , backgroundColor : ['#e0e0e0'] }]
          }

        } else {
        const labels = data.map((item: { category: any; }) => item.category);
        const values = data.map((item: { total: any; }) => item.total);
        this.pieChartData = { labels, datasets: [{ data: values }] };
        }
      },
        error: () => {
      this.pieChartData = {
        labels: ['Error'],
        datasets: [{ data: [1], backgroundColor: ['#ffcdd2'] }]
      };
    }
    });
  }

  loadStatus() {
    this.dashboardService.getStatus().subscribe({
      next: (data) => {
        this.firstDate = data.firstDate ? new Date(data.firstDate).toLocaleDateString() :  '';
        this.lastDate = data.lastDate ? new Date(data.lastDate).toLocaleDateString() :  '';
        this.totalAmount = data.totalAmount;
        this.totalCount = data.totalCount;
      },
      error: () => alert("Failed to load expense status")
    });
  }

  loadMonthlySummary() {
    this.dashboardService.getMonthlySummary().subscribe({
      next: (data) => {

        if(data.length === 0){

          this.barChartData = {
            labels : ['No Data'],
            datasets : [{ label : 'Monthely Expenses' , data : [0] , backgroundColor : ['#e0e0e0'] }]
          }
        } else {

           const labels = data.map((item: { month: string }) => {
          if (!item.month || !item.month.includes('-')) return 'Unknown';
          const [year, month] = item.month.split('-');
          return new Date(+year, +month - 1).toLocaleString('default', { month: 'short', year: 'numeric' });
        });

        const values = data.map((item: { total: number }) => item.total);
        this.barChartData = {
          labels,
          datasets: [{ label: 'Monthly Expenses', data: values }]
        };
        }
      },
      error: () => {
      this.barChartData = {
        labels: ['Error'],
        datasets: [{ label: 'Monthly Expenses', data: [0], backgroundColor: ['#ffcdd2'] }]
      };
    }
    })
  }
  public chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };
  expenses: any[] = [];
  editingExpense: any = null;
  displayedColumns: string[] = ['name', 'amount', 'date', 'category', 'payment', 'comments', 'actions'];
    ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

 onPieChartClick(event: any) {
  if (event.active?.length > 0) {
    this.dialog.open(DashboardpieDialogComponent, {
      width: '400px',
      disableClose: true,
      data: this.pieChartData 
    });
     this.showAddExpenseButton = false
  }
}

  navigateToAddExpense(){
    this.router.navigate(['/expense/addExpense'])
  }

  loadExpenses() {
    this.dashboardService.getExpense().subscribe({
      next: (data) => {
        this.expenses = data;
        this.dataSource.data = data;
      },
      error: () => alert("Failed to load expenses")
    });
  }

deleteExpense(id: string) {
  const snackBarRef = this.snackBar.open('Are you sure you want to delete this expense ? ', 'Yes',  { 
    duration: 5000,
  });

  snackBarRef.onAction().subscribe(() => {
    this.dashboardService.deleteExpense(id).subscribe({
      next: () => {
        this.snackBar.open('Expense deleted','Close');
          this.loadExpenses();
            this.loadSummary();
            this.loadMonthlySummary();
            this.loadStatus();
      },
      error: () => {
        this.snackBar.open(' Delete failed', 'Close', { duration: 300 });
      }
    });
  });
}

  editExpense(expense: any) {
    const editableData = {
      ...expense,
      date: expense.date?.split('T')[0]
    };

    const dialogRef = this.dialog.open(ExpenceEditDaialodComponent, {
      width: '400px',
      data: editableData
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.dashboardService.updateExpense(expense._id, result).subscribe({
          next: () => {
            this.loadExpenses();
            this.loadSummary();
            this.loadMonthlySummary();
            this.loadStatus();
          },
          error: (err) =>
            console.error(err)

        });
      }
    });
  }
  cancelEdit() {
    this.editingExpense = null;
  }

}
