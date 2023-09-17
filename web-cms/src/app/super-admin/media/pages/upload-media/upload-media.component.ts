import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DropzoneDirective } from '../../components/dropzone.directive';
import { CommonModule } from '@angular/common';
import { getDownloadURL, getMetadata, getStorage, ref, uploadBytesResumable } from '@angular/fire/storage';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-upload-media',
  templateUrl: './upload-media.component.html',
  styleUrls: ['./upload-media.component.scss'],
  standalone: true,
  imports: [ RouterModule, DropzoneDirective, CommonModule ],
  providers: [ CookieService ]
})
export class UploadMediaComponent implements OnInit {
  allFiles: File[] = [];

  constructor(private cookieService : CookieService) { }

  ngOnInit() {
  }

  droppedFiles(allFiles: File[]) {
    const filesAmount = allFiles.length;
    for (let i = 0; i < filesAmount; i++) {
      const file = allFiles[i];
      this.allFiles.push(file);
    }
  }

  clearFiles() {
    this.allFiles = [];
  }

  uploadFiles() {
    if (this.allFiles.length == 0) {
      return;
    }

    const workspaceId = this.cookieService.get('workspaceID');
    const files = this.allFiles;
    const storage = getStorage();
    const storageRef = ref(storage);
    var docMetaData = {
      fullPath: '',
      timeCreated: '',
      url: '',
    }

    for (let i = 0; i < files.length; i++) {
      let path = 'workspaces/' + workspaceId + '/' + files[i].name;
      let fileRef = ref(storageRef, path);
      let uploadTask = uploadBytesResumable(fileRef, files[i]);

      uploadTask.on('state_changed',
        (snapshot) => {
          // progress function
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          // error function
          console.log(error);
        },
        async () => {
          // complete function
          await getMetadata(uploadTask.snapshot.ref).then((metadata) => {
            docMetaData.fullPath = metadata.fullPath;
            docMetaData.timeCreated = metadata.timeCreated;
          });
          await getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            docMetaData.url = url;
          });
          console.log(docMetaData);
          // clear files
          this.allFiles = [];
        }
      );
    }

  }
}
