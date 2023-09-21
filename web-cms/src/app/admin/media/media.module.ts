import { NgModule } from '@angular/core';
import { UploadMediaComponent } from './pages/upload-media/upload-media.component';
import { ViewMediaComponent } from './pages/view-media/view-media.component';
import { MediaRoutingModule } from './media-routing.module';
import { DropzoneDirective } from './components/dropzone.directive';
import { MediaTableComponent } from './components/media-table/media-table.component';
import { MediaTableItemComponent } from './components/media-table-item/media-table-item.component';



@NgModule({
  imports: [
    UploadMediaComponent,
    ViewMediaComponent,
    MediaRoutingModule,
    DropzoneDirective,
    MediaTableComponent,
    MediaTableItemComponent
  ],
  declarations: [

  ]
})
export class MediaModule { }
