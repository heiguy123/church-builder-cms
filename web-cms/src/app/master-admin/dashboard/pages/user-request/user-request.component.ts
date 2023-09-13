import { Component, OnInit } from '@angular/core';
import { RequestTableComponent } from '../../components/request-table/request-table.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-request',
  templateUrl: './user-request.component.html',
  styleUrls: ['./user-request.component.scss'],
  standalone: true,
  imports: [RequestTableComponent, RouterModule],
})
export class UserRequestComponent implements OnInit {
  ngOnInit(): void {
  }
}
