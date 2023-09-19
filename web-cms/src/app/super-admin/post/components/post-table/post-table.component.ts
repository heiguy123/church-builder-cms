import { Component, OnInit } from '@angular/core';
import { PostTableItemComponent } from '../post-table-item/post-table-item.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Post } from '../../models/post';
import { doc, getDoc, getFirestore } from '@angular/fire/firestore';

@Component({
  selector: '[app-post-table]',
  templateUrl: './post-table.component.html',
  styleUrls: ['./post-table.component.scss'],
  standalone: true,
  imports: [ PostTableItemComponent, CommonModule, RouterLink ],
  providers: [ CookieService ]
})
export class PostTableComponent implements OnInit {
  public activeTable : Post[] = [];

  constructor(private cookieService: CookieService) {}

  ngOnInit(): void {
    this.fetchPosts();
  }

  async fetchPosts() {
    const firestore = getFirestore();
    const workspaceID = this.cookieService.get('workspaceID');
    await getDoc(doc(firestore, "workspaces", workspaceID))
    .then((doc) => {
      if (doc.exists()) {
        const posts = doc.data()['posts'];
        posts.forEach((post: any) => {
          if (post['isDeleted'] == false) {
            this.activeTable.push({
              id: post['id'],
              title: post['title'],
              HTMLContent: post['HTMLContent'],
              timestamp: post['timestamp'],
              status: post['status'],
              visibility: post['visibility'],
            });
          }
        });
      }
    });
  }
}
