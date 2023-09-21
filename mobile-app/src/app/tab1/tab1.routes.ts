import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab1Page } from './tab1.page';
import { SinglePostPage } from './single-post/single-post.page';
import { ViewPostPage } from './view-post/view-post.page';

const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
    children: [
        { path: '', component: ViewPostPage },
        { path: 'details/:id/:workspaceId', component: SinglePostPage },
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
export class HomeRoutingModule { }
