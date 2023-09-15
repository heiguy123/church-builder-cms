import { Component, OnInit } from '@angular/core';
import { AccountTableComponent } from '../../components/account-table/account-table.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: '[app-view-account]',
  templateUrl: './view-account.component.html',
  styleUrls: ['./view-account.component.scss'],
  standalone: true,
  imports: [ AccountTableComponent, RouterModule ],
})
export class ViewAccountComponent implements OnInit {
  ngOnInit(): void {
  }
}
