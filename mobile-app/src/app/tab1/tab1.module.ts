import { NgModule } from '@angular/core';
import { ViewPostPage } from './view-post/view-post.page';
import { SinglePostPage } from './single-post/single-post.page';
import { Tab1Page } from './tab1.page';
import { HomeRoutingModule } from './tab1.routes';



@NgModule({
  declarations: [
  ],
  imports: [
    ViewPostPage,
    SinglePostPage,
    Tab1Page,
    HomeRoutingModule
  ]
})
export class Tab1Module {
  constructor() { 
  }
 }
