import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DropzoneDirective } from '../../components/dropzone.directive';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upload-media',
  templateUrl: './upload-media.component.html',
  styleUrls: ['./upload-media.component.scss'],
  standalone: true,
  imports: [ RouterModule, DropzoneDirective, CommonModule ]
})
export class UploadMediaComponent implements OnInit {
  allFiles: File[] = [];

  constructor() { }

  ngOnInit() {
  }

  droppedFiles(allFiles: File[]) {
    const filesAmount = allFiles.length;
    for (let i = 0; i < filesAmount; i++) {
      const file = allFiles[i];
      this.allFiles.push(file);
    }
  }
}
