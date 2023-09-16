import { NgModule } from '@angular/core';
import { UploadMediaComponent } from './pages/upload-media/upload-media.component';
import { ViewMediaComponent } from './pages/view-media/view-media.component';
import { MediaRoutingModule } from './media-routing.module';



@NgModule({
  imports: [
    UploadMediaComponent,
    ViewMediaComponent,
    MediaRoutingModule
  ]
})
export class MediaModule { }
