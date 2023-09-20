import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { WorkspaceComponent } from './pages/workspace/workspace.component';

@NgModule({
  imports: [DashboardRoutingModule, WorkspaceComponent],
})
export class DashboardModule {}