import { Component, Input, OnInit } from '@angular/core';
import { Account } from '../../models/account';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: '[app-account-table-item]',
  templateUrl: './account-table-item.component.html',
  standalone: true,
  imports: [ AngularSvgIconModule, CommonModule, RouterLink ],
})
export class AccountTableItemComponent implements OnInit {
  @Input () table = <Account>{};

  constructor() {}

  ngOnInit(): void {}
}
