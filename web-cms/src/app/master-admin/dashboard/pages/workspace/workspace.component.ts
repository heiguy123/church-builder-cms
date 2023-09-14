import { Component, OnInit } from '@angular/core';
import { WorkspaceTableComponent } from '../../components/workspace-table/workspace-table.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  standalone : true,
  styleUrls: ['./workspace.component.scss'],
  imports: [ WorkspaceTableComponent, CommonModule ],
})
export class WorkspaceComponent implements OnInit {
  ngOnInit(): void {
  }
}
