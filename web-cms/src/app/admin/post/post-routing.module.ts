import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostComponent } from './post.component';
import { ViewPostComponent } from './pages/view-post/view-post.component';
import { SinglePostComponent } from './pages/single-post/single-post.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';

const routes: Routes = [
  {
    path: '',
    component: PostComponent,
    children: [
      { path: 'app-view-post', component: ViewPostComponent },
      { path: 'app-view-post/details/:id', component: SinglePostComponent },
      { path: 'app-create-post', component: CreatePostComponent },
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
export class PostRoutingModule { }
