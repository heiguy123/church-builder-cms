import { Component, OnInit } from '@angular/core';
import { PostTableComponent } from '../../components/post-table/post-table.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss'],
  standalone: true,
  imports: [ PostTableComponent, RouterModule ],
})
export class ViewPostComponent implements OnInit {
  ngOnInit(): void {
  }
}
