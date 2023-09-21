import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { doc, getDoc, getFirestore } from '@angular/fire/firestore';
import { Workspace } from '../../models/workspace';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  standalone : true,
  styleUrls: ['./workspace.component.scss'],
  imports: [ CommonModule ],
  providers: [ CookieService ]
})
export class WorkspaceComponent implements OnInit {
  public table: Workspace[] = [];

  ngOnInit(): void {
    this.fetchWorkspace();
  }

  constructor(private cookieService: CookieService) { }

  async fetchWorkspace() {
    const firestore = getFirestore();
    const workspaceID = this.cookieService.get('workspaceID');
    const docRef = doc(firestore, "workspaces", workspaceID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      this.table.push({
        workspace_id: docSnap.id,
        organization_name: docSnap.data()['organization']['organization_name'],
        organization_address: docSnap.data()['organization']['organization_address'],
        organization_city: docSnap.data()['organization']['organization_city'],
        organizatiton_denomination: docSnap.data()['organization']['organization_denomination'],
        organization_member_size: docSnap.data()['organization']['organization_member_size'],
        organization_state: docSnap.data()['organization']['organization_state'],
        organization_zip: docSnap.data()['organization']['organization_zip']
      });
    }
  }
}
