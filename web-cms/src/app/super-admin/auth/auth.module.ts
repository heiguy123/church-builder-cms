import { NgModule } from '@angular/core';
import { ProfileComponent } from './pages/profile/profile.component';
import { NewPasswordComponent } from './pages/new-password/new-password.component';
import { AuthRoutingModule } from './auth-routing.module';



@NgModule({
  declarations: [
  ],
  imports: [
    ProfileComponent,
    NewPasswordComponent,
    AuthRoutingModule
  ]
})
export class AuthModule { }
