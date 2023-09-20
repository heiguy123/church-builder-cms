import { NgModule } from '@angular/core';
import { AppBuilderRoutingModule } from './app-builder-routing.module';
import { AppLayoutComponent } from './pages/app-layout/app-layout.component';
import { DeployAppComponent } from './pages/deploy-app/deploy-app.component';



@NgModule({
  declarations: [
    
  ],
  imports: [
    AppBuilderRoutingModule,
    AppLayoutComponent,
    DeployAppComponent
  ]
})
export class AppBuilderModule { }
