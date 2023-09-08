import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WorkspaceComponent } from './workspace/workspace.component';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

const MasterAdminModuleRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'workspace', component: WorkspaceComponent },
];

@NgModule({
  declarations: [
    WorkspaceComponent
  ],
  imports: [
    CommonModule,
    DashboardComponent,
    RouterModule.forChild(MasterAdminModuleRoutes)
  ],
  exports: [RouterModule]
})
export class MasterAdminModule { }
