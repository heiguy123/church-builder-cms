import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MobileAppBuilderComponent } from './mobile-app-builder/mobile-app-builder.component';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';


const TechAdminModuleRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'mobile-app-builder', component: MobileAppBuilderComponent },
];

@NgModule({
  declarations: [
    DashboardComponent,
    MobileAppBuilderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(TechAdminModuleRoutes)
  ],
  exports: [RouterModule]
})
export class TechAdminModule { }
