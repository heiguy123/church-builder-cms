import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { NgModule } from '@angular/core';
import { Tab2Page } from '../tab2/tab2.page';

const routes: Routes = [
  {
    path: 'app',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../tab1/tab1.module').then((m) => m.Tab1Module),
      },
      {
        path: 'Organizations',
        component: Tab2Page,
      },
      {
        path: '',
        redirectTo: '/app/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/app/home',
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabRoutingModule { }