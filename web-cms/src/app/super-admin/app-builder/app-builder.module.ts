import { NgModule } from '@angular/core';
import { AppBuilderRoutingModule } from './app-builder-routing.module';
import { AppLayoutComponent } from './pages/app-layout/app-layout.component';
import { DeployAppComponent } from './pages/deploy-app/deploy-app.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Add this import



@NgModule({
  declarations: [
    
  ],
  imports: [
    AppBuilderRoutingModule,
    AppLayoutComponent,
    DeployAppComponent,
    CommonModule, FormsModule
  ]
})
export class AppBuilderModule { }
