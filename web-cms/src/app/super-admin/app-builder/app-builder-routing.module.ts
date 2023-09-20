import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppBuilderComponent } from './app-builder.component';
import { AppLayoutComponent } from './pages/app-layout/app-layout.component';
import { DeployAppComponent } from './pages/deploy-app/deploy-app.component';

const routes: Routes = [
  {
    path: '',
    component: AppBuilderComponent,
    children: [
      { path: 'app-app-layout', component: AppLayoutComponent },
      { path: 'app-deploy-app', component: DeployAppComponent },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class AppBuilderRoutingModule { }
