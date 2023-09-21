import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MediaTableComponent } from '../../components/media-table/media-table.component';

@Component({
  selector: '[app-view-media]',
  templateUrl: './view-media.component.html',
  styleUrls: ['./view-media.component.scss'],
  standalone: true,
  imports: [ RouterModule, MediaTableComponent ],
})
export class ViewMediaComponent implements OnInit {
  ngOnInit(): void {
  }
}
