import { Component, Input, OnInit } from '@angular/core';
import { Workspace } from '../../models/workspace';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: '[app-workspace-table-item]',
  templateUrl: './workspace-table-item.component.html',
  standalone: true,
  imports: [AngularSvgIconModule, CommonModule, RouterLink],
})
export class WorkspaceTableItemComponent implements OnInit {
  @Input() table = <Workspace>{};

  constructor() {}

  ngOnInit(): void {}
}
