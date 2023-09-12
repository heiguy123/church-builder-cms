import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { RequestTableComponent } from './components/request-table/request-table.component';
import { RequestTableItemComponent } from './components/request-table-item/request-table-item.component';
import { SingleUserRequestComponent } from './pages/single-user-request/single-user-request.component';

@NgModule({
  imports: [DashboardRoutingModule, RequestTableComponent,
    RequestTableItemComponent, SingleUserRequestComponent],
  declarations: [
  ],
})
export class DashboardModule {}