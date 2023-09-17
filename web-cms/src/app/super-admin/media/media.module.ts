import { NgModule } from '@angular/core';
import { UploadMediaComponent } from './pages/upload-media/upload-media.component';
import { ViewMediaComponent } from './pages/view-media/view-media.component';
import { MediaRoutingModule } from './media-routing.module';
import { DropzoneDirective } from './components/dropzone.directive';



@NgModule({
  imports: [
    UploadMediaComponent,
    ViewMediaComponent,
    MediaRoutingModule,
    DropzoneDirective
  ],
  declarations: [
    
  ]
})
export class MediaModule { }
