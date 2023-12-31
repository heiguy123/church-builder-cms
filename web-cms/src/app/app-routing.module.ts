import { NgModule } from '@angular/core';
import { AdminAuthGuard } from './auth/admin-auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { MasterAdminAuthGuard } from './auth/master-admin-auth.guard';
import { SuperAdminAuthGuard } from './auth/super-admin-auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  // First redirect to home page
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  // Public Routes or Routes that do not require authentication
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Private Routes or Routes that require authentication
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [AdminAuthGuard] },
  { path: 'master-admin', loadChildren: () => import('./master-admin/master-admin.module').then(m => m.MasterAdminModule), canActivate: [MasterAdminAuthGuard] },
  { path: 'super-admin', loadChildren: () => import('./super-admin/super-admin.module').then(m => m.SuperAdminModule), canActivate: [SuperAdminAuthGuard] },
];

@NgModule({
  declarations: [],
  imports: [
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
