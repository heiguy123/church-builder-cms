import { NgModule } from '@angular/core';
import { ProfileComponent } from './pages/profile/profile.component';
import { NewPasswordComponent } from './pages/new-password/new-password.component';
import { AuthRoutingModule } from './auth-routing.module';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
  ],
  imports: [
    ProfileComponent,
    NewPasswordComponent,
    AuthRoutingModule,
    CommonModule
  ]
})
export class AuthModule { }
