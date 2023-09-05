import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideFunctions,getFunctions } from '@angular/fire/functions';
import { provideMessaging,getMessaging } from '@angular/fire/messaging';
import { providePerformance,getPerformance } from '@angular/fire/performance';
import { provideRemoteConfig,getRemoteConfig } from '@angular/fire/remote-config';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { HeaderComponent } from './shared-modules/header/header.component';
import { SidenavComponent } from './shared-modules/sidenav/sidenav.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import  { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { ForgotComponent } from './forgot/forgot.component';
import { AdminAuthGuard } from './auth/admin-auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { MasterAdminAuthGuard } from './auth/master-admin-auth.guard';
import { SuperAdminAuthGuard } from './auth/super-admin-auth.guard';
import { TechAdminAuthGuard } from './auth/tech-admin-auth.guard';

const routes: Routes = [
  // Public Routes or Routes that do not require authentication
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot', component: ForgotComponent },

  // Shared Routes or Routes that are accessible by all users
  { path: 'shared', loadChildren: () => import('./shared-modules/shared-modules.module').then(m => m.SharedModulesModule)},

  // Private Routes or Routes that require authentication
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [AdminAuthGuard] },
  { path: 'master-admin', loadChildren: () => import('./master-admin/master-admin.module').then(m => m.MasterAdminModule), canActivate: [MasterAdminAuthGuard] },
  { path: 'super-admin', loadChildren: () => import('./super-admin/super-admin.module').then(m => m.SuperAdminModule), canActivate: [SuperAdminAuthGuard] },
  { path: 'tech-admin', loadChildren: () => import('./tech-admin/tech-admin.module').then(m => m.TechAdminModule), canActivate: [TechAdminAuthGuard] },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    HomeComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    ForgotComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideMessaging(() => getMessaging()),
    providePerformance(() => getPerformance()),
    provideRemoteConfig(() => getRemoteConfig()),
    provideStorage(() => getStorage()),
    RouterModule.forRoot(routes)
  ],
  providers: [
    ScreenTrackingService,UserTrackingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
