import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';

const routes: Routes = [ { path : '',  component : OverviewComponent  } ,
    { path: 'getExpense', component: OverviewComponent },
    { path: 'deleteExpense', component: OverviewComponent },
    { path: 'updateExpense', component: OverviewComponent },
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
