import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewAccountComponent } from './pages/view-account/view-account.component';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import { AccountTableComponent } from './components/account-table/account-table.component';
import { AccountTableItemComponent } from './components/account-table-item/account-table-item.component';
import { SingleAccountComponent } from './pages/single-account/single-account.component';
import { AccountRoutingModule } from './account-routing.module';



@NgModule({
  imports: [
    AccountRoutingModule,
    ViewAccountComponent,
    CreateAccountComponent,
    AccountTableComponent,
    AccountTableItemComponent,
    SingleAccountComponent
  ],
})
export class AccountModule { }
