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

    // Fetch media items and convert timeCreated to string
    const mediaItems: any[] = await Promise.all(listResult.items.map(async (itemRef) => {
      const metadata = await getMetadata(itemRef);
      const url = await getDownloadURL(itemRef);
      return {
        name: metadata.name,
        url: url,
        timeCreated: new Date(metadata.timeCreated).toISOString(), // Convert Date object to ISO string
        fileType: metadata.contentType,
        fileSize: metadata.size
      };
    }));

    // Sort media items by timeCreated in descending order
    mediaItems.sort((a, b) => b.timeCreated.localeCompare(a.timeCreated));

    // Push sorted media items with timeCreated as strings to activeTable
    this.activeTable.push(...mediaItems);
  }
}
