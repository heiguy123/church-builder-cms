import { Component, OnInit } from '@angular/core';
import { WorkspaceTableItemComponent } from '../workspace-table-item/workspace-table-item.component';
import { CommonModule } from '@angular/common';
import { Workspace } from '../../models/workspace';
import { collection, getDocs, getFirestore } from '@angular/fire/firestore';

@Component({
  selector: '[app-workspace-table]',
  templateUrl: './workspace-table.component.html',
  standalone: true,
  imports: [ WorkspaceTableItemComponent, CommonModule ],
})
export class WorkspaceTableComponent implements OnInit {

  public activeTable: Workspace[] = [];

  constructor() {};

  ngOnInit(): void {
    this.fetchWorkspaces();
  }

  async fetchWorkspaces() {
    const firestore = getFirestore();
    const querySnapshot = await getDocs(collection(firestore, "workspaces"));
    querySnapshot.forEach((doc) => {
      this.activeTable.push({
        workspace_id: doc.id,
        organization_name: doc.data()['organization']['organization_name'],
        organization_address: doc.data()['organization']['organization_address'],
        organization_city: doc.data()['organization']['organization_city'],
        organizatiton_denomination: doc.data()['organization']['organization_denomination'],
        organization_member_size: doc.data()['organization']['organization_member_size'],
        organization_state: doc.data()['organization']['organization_state'],
        organization_zip: doc.data()['organization']['organization_zip']
      });
    });
  }
}
