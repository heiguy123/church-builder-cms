import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Post } from '../../models/post';

@Component({
  selector: '[app-post-table-item]',
  templateUrl: './post-table-item.component.html',
  styleUrls: ['./post-table-item.component.scss'],
  standalone: true,
  imports: [ AngularSvgIconModule, CommonModule, RouterLink ],
})
export class PostTableItemComponent implements OnInit {
  @Input () table = <Post>{};

  constructor() {}

  ngOnInit(): void {}
}
