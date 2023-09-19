import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Media } from '../../models/media';

@Component({
  selector: '[app-media-table-item]',
  templateUrl: './media-table-item.component.html',
  styleUrls: ['./media-table-item.component.scss'],
  standalone: true,
  imports: [ AngularSvgIconModule, CommonModule, RouterLink ]
})
export class MediaTableItemComponent implements OnInit {
  @Input () table = <Media>{};

  constructor() {}

  ngOnInit(): void {}

  copyUrlToClipboard() {
    const url = this.table.url;
    navigator.clipboard.writeText(url).then(() => {
      console.log('Copied to clipboard successfully!');
    }, () => {
      console.log('Failed to copy to clipboard!');
    });
  }
}
