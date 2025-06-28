import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpenseRoutingModule } from './expense-routing.module';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';



@NgModule({
  declarations: [
    AddExpenseComponent,
  ],
  imports: [
    CommonModule,
    ExpenseRoutingModule , MatIconModule , MatDividerModule , MatCardModule , MatButtonModule , MatTableModule , MatDialogModule ,MatDatepickerModule , MatFormFieldModule , MatInputModule , MatNativeDateModule , FormsModule, MatSelectModule
  ]
})
export class ExpenseModule { }
