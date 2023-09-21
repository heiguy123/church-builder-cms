import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const AdminModuleRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('./layout/layout.module').then((m) => m.LayoutModule),
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(AdminModuleRoutes)
  ],
  exports: [RouterModule],
  declarations: [
  ]
})
export class AdminModule { }
