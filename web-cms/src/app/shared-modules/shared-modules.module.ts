import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { SidebarComponent } from './layout/components/sidebar/sidebar.component';
import { SidebarMenuComponent } from './layout/components/sidebar/sidebar-menu/sidebar-menu.component';
import { SidebarSubmenuComponent } from './layout/components/sidebar/sidebar-submenu/sidebar-submenu.component';
import { LayoutComponent } from './layout/layout.component';

const sharedModulesRoutes: Routes = [

];

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SidebarComponent,
    SidebarMenuComponent,
    SidebarSubmenuComponent,
    LayoutComponent,
    RouterModule.forChild(sharedModulesRoutes)  
  ],
  exports: [RouterModule]
})
export class SharedModulesModule { }
