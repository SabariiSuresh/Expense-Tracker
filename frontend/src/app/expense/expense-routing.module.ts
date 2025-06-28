import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddExpenseComponent } from './add-expense/add-expense.component';

const routes: Routes = [
  { path: '' , redirectTo : 'addExpense' , pathMatch : 'full' },
  { path: 'addExpense', component: AddExpenseComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpenseRoutingModule { }
