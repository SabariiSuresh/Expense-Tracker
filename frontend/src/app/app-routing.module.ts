import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { DashboardLaoutComponent } from './layout/dashboard-laout/dashboard-laout.component';
import { WildcardComponent } from './wildcard/wildcard.component';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(module => module.AuthModule) },
  {
    path: '', component: DashboardLaoutComponent,

    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(module => module.DashboardModule)},
      { path: 'expense', loadChildren: () => import('./expense/expense.module').then(m => m.ExpenseModule), canActivate: [AuthGuard] },
      { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule), canActivate: [AuthGuard] }
    ]
  },
  { path : '**' , component : WildcardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
