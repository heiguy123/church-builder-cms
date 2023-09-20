import { Component, OnInit } from '@angular/core';
import { MediaTableItemComponent } from '../media-table-item/media-table-item.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Media } from '../../models/media';
import { getDownloadURL, getMetadata, getStorage, listAll, ref } from '@angular/fire/storage';

@Component({
  selector: '[app-media-table]',
  templateUrl: './media-table.component.html',
  standalone: true,
  imports: [ MediaTableItemComponent, CommonModule, RouterLink ],
  providers: [ CookieService ]
})
export class MediaTableComponent implements OnInit {
  public activeTable : Media[] = [];

  constructor(private cookieService: CookieService) {}

  ngOnInit(): void {
    this.fetchAllMedia();
  }

  async fetchAllMedia() {
    // fetch all media from firebase storage within the /workspaces/{workspaceID}/media directory
    // and add them to the activeTable array
    const workspaceID = this.cookieService.get('workspaceID');
    const storage = getStorage();
    const listRef = ref(storage, `workspaces/${workspaceID}`);
    const listResult = await listAll(listRef);
    listResult.items.forEach((itemRef) => {
      getMetadata(itemRef).then((metadata) => {
        // get Download URL from firebase storage based on the this media's full path
        // and add it to the activeTable array
        getDownloadURL(itemRef).then((url) => {
          this.activeTable.push({
            name: metadata.name,
            url: url,
            timeCreated: metadata.timeCreated,
            fileType: metadata.contentType,
            fileSize: metadata.size
          });
        });
      });
    });
  }
}
