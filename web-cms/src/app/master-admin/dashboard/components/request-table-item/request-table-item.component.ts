import { Component, Input, OnInit } from '@angular/core';
import { UserRequest } from '../../models/user-request';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: '[app-request-table-item]',
  templateUrl: './request-table-item.component.html',
  standalone: true,
  imports: [AngularSvgIconModule, CommonModule, RouterLink],
})
export class RequestTableItemComponent implements OnInit {

  @Input() table = <UserRequest>{};

  constructor() {}

  ngOnInit(): void {}
  
}
