import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { Routes } from '@angular/router';

const sharedModulesRoutes: Routes = [
  { path: 'header', component: HeaderComponent },
  { path: 'sidenav', component: SidenavComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(sharedModulesRoutes)  
  ],
  exports: [RouterModule]
})
export class SharedModulesModule { }
