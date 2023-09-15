import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account.component';
import { ViewAccountComponent } from './pages/view-account/view-account.component';
import { SingleAccountComponent } from './pages/single-account/single-account.component';
import { CreateAccountComponent } from './pages/create-account/create-account.component';

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      { path: 'app-view-account', component: ViewAccountComponent },
      { path: 'app-view-account/details/:id', component: SingleAccountComponent },
      { path: 'app-create-account', component: CreateAccountComponent },
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
export class AccountRoutingModule { }
