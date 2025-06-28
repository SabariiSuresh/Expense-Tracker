import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { OverviewComponent } from './overview/overview.component';
import { RouterModule } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';
import { ExpenceEditDaialodComponent } from '../expense/expence-edit-daialod/expence-edit-daialod.component';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DashboardpieDialogComponent } from '../dashboardpie-dialog/dashboardpie-dialog.component';
import { MatIcon} from '@angular/material/icon';


@NgModule({
  declarations: [
    OverviewComponent,
    ExpenceEditDaialodComponent,
    DashboardpieDialogComponent

  ],
  exports: [
    DashboardpieDialogComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule  , MatPaginatorModule , MatIcon , MatDialogModule , NgChartsModule , FormsModule , RouterModule , MatSelectModule , MatButtonModule , MatFormFieldModule , MatInputModule , MatTableModule
  ]
})
export class DashboardModule { }
