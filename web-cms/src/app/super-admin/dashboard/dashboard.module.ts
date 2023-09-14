import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { RequestTableComponent } from './components/request-table/request-table.component';
import { RequestTableItemComponent } from './components/request-table-item/request-table-item.component';
import { SingleUserRequestComponent } from './pages/single-user-request/single-user-request.component';
import { WorkspaceComponent } from './pages/workspace/workspace.component';
import { WorkspaceTableComponent } from './components/workspace-table/workspace-table.component';
import { WorkspaceTableItemComponent } from './components/workspace-table-item/workspace-table-item.component';

@NgModule({
  imports: [DashboardRoutingModule, RequestTableComponent,
    RequestTableItemComponent, SingleUserRequestComponent, WorkspaceComponent, WorkspaceTableComponent,
    WorkspaceTableItemComponent],
})
export class DashboardModule {}