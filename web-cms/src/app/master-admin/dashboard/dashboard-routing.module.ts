import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { UserRequestComponent } from './pages/user-request/user-request.component';
import { SingleUserRequestComponent } from './pages/single-user-request/single-user-request.component';
import { WorkspaceComponent } from './pages/workspace/workspace.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'app-user-request', component: UserRequestComponent, },
      { path: 'app-user-request/details/:id', component: SingleUserRequestComponent },
      { path: 'app-workspace', component: WorkspaceComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }
