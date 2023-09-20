import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: LayoutComponent,
    loadChildren: () => import('../dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'post',
    component: LayoutComponent,
    loadChildren: () => import('../post/post.module').then((m) => m.PostModule),
  },
  {
    path: 'media',
    component: LayoutComponent,
    loadChildren: () => import('../media/media.module').then((m) => m.MediaModule),
  },
  {
    path: 'account',
    component: LayoutComponent,
    loadChildren: () => import('../account/account.module').then((m) => m.AccountModule),
  },
  {
    path: 'app-builder',
    component: LayoutComponent,
    loadChildren: () => import('../app-builder/app-builder.module').then((m) => m.AppBuilderModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}