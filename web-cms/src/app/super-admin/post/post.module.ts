import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewPostComponent } from './pages/view-post/view-post.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { SinglePostComponent } from './pages/single-post/single-post.component';
import { PostTableComponent } from './components/post-table/post-table.component';
import { PostTableItemComponent } from './components/post-table-item/post-table-item.component';
import { PostRoutingModule } from './post-routing.module';
import { HTMLRichTextEditorComponent } from './components/html-rich-text-editor/html-rich-text-editor.component';



@NgModule({
  declarations: [
  ],
  imports: [
    ViewPostComponent,
    CreatePostComponent,
    SinglePostComponent,
    PostTableComponent,
    PostTableItemComponent,
    PostRoutingModule,
    HTMLRichTextEditorComponent
  ]
})
export class PostModule { }
