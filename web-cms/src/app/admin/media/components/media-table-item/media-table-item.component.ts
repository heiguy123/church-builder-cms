import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Media } from '../../models/media';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: '[app-media-table-item]',
  templateUrl: './media-table-item.component.html',
  styleUrls: ['./media-table-item.component.scss'],
  standalone: true,
  imports: [ AngularSvgIconModule, CommonModule, RouterLink ]
})
export class MediaTableItemComponent implements OnInit {
  @Input () table = <Media>{};

  constructor(private toastr: ToastrService,) {}

  toastrMsg(type: string, msg: string) {
    if (type === 'success') {
      this.toastr.success(msg, 'Success', {
        timeOut: 3000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right',
      });
    } else if (type === 'error') {
      this.toastr.error(msg, 'Error', {
        timeOut: 3000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right',
      });
    }
  }

  ngOnInit(): void {}

  copyUrlToClipboard() {
    const url = this.table.url;
    navigator.clipboard.writeText(url).then(() => {
      this.toastrMsg('success', 'Copied to clipboard successfully!');
    }, () => {
      this.toastrMsg('error', 'Failed to copy to clipboard!');
    });
  }
}
