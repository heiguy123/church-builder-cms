import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

const MasterAdminModuleRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('./layout/layout.module').then((m) => m.LayoutModule),
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(MasterAdminModuleRoutes)
  ],
  exports: [RouterModule]
})
export class MasterAdminModule { }
