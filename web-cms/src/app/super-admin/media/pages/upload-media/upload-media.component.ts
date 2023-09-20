import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DropzoneDirective } from '../../components/dropzone.directive';
import { CommonModule } from '@angular/common';
import { getDownloadURL, getMetadata, getStorage, ref, uploadBytesResumable } from '@angular/fire/storage';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private cookieService : CookieService, private toastr: ToastrService,) { }

  ngOnInit() {
  }

  toastrMsg(type: string, msg: string) {
    if (type === 'success') {
      this.toastr.success(msg, 'Success', {
        timeOut: 3000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right',
      });
    } else if (type === 'error') {
      this.toastr.error(msg, 'Error', {
        timeOut: 3000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right',
      });
    }
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
      this.toastrMsg('error', 'Please select a file to upload.');
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
          this.toastrMsg('success', 'Upload is ' + progress + '% done');
        },
        (error) => {
          // error function
          this.toastrMsg('error', 'Error uploading file. Error: ' + error.code + ' Message: ' + error.message);
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
          // clear files
          this.allFiles = [];
        }
      );
    }

  }
}
