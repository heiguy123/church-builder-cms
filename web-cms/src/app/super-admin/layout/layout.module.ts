import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { LayoutRoutingModule } from './layout-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NavbarMenuComponent } from './components/navbar/navbar-menu/navbar-menu.component';
import { NavbarSubmenuComponent } from './components/navbar/navbar-submenu/navbar-submenu.component';
import { ProfileMenuComponent } from './components/navbar/profile-menu/profile-menu.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
  ],
  imports: [LayoutRoutingModule, HttpClientModule, AngularSvgIconModule.forRoot(), CommonModule, NavbarComponent,
    NavbarMenuComponent,
    NavbarSubmenuComponent,
    ProfileMenuComponent,],
})
export class LayoutModule { }
