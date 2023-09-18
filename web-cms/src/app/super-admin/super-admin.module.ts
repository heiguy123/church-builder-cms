import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostComponent } from './post/post.component';

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
  exports: [RouterModule],
  declarations: [
    
  ]
})
export class SuperAdminModule { }
