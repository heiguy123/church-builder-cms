import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post/post.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

const AdminModuleRoutes: Routes = [
  { path: 'post', component: PostComponent },
  { path: 'announcement', component: AnnouncementComponent },
];

@NgModule({
  declarations: [
    PostComponent,
    AnnouncementComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AdminModuleRoutes)
  ],
  exports: [RouterModule]
})
export class AdminModule { }
