import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const SuperAdminModuleRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('./layout/layout.module').then((m) => m.LayoutModule),
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(SuperAdminModuleRoutes)
  ],
  exports: [RouterModule]
})
export class SuperAdminModule { }
