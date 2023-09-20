import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MediaComponent } from './media.component';
import { ViewMediaComponent } from './pages/view-media/view-media.component';
import { UploadMediaComponent } from './pages/upload-media/upload-media.component';

const routes: Routes = [
  {
    path: '',
    component: MediaComponent,
    children: [
      { path: 'app-view-media', component: ViewMediaComponent },
      { path: 'app-upload-media', component: UploadMediaComponent },
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
export class MediaRoutingModule { }
