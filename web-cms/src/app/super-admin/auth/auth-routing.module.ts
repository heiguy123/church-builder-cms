import { NgModule } from '@angular/core';
import { ProfileComponent } from './pages/profile/profile.component';
import { NewPasswordComponent } from './pages/new-password/new-password.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: 'app-profile', component: ProfileComponent },
      { path: 'app-new-password', component: NewPasswordComponent },
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
export class AuthRoutingModule { }
