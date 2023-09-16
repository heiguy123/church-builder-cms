import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: '[app-view-media]',
  templateUrl: './view-media.component.html',
  styleUrls: ['./view-media.component.scss'],
  standalone: true,
  imports: [ RouterModule ],
})
export class ViewMediaComponent implements OnInit {
  ngOnInit(): void {
  }
}
