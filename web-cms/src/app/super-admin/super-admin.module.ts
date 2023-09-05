import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountComponent } from './account/account.component';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

const SuperAdminModuleRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'account', component: AccountComponent },
];

@NgModule({
  declarations: [
    DashboardComponent,
    AccountComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(SuperAdminModuleRoutes)
  ],
  exports: [RouterModule]
})
export class SuperAdminModule { }
