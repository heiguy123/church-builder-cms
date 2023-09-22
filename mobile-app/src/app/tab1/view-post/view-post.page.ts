import { Component, OnInit } from '@angular/core';
import { collection, getDocs, getFirestore } from '@angular/fire/firestore';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.page.html',
  styleUrls: ['./view-post.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink ],
})
export class ViewPostPage implements OnInit {
  public table: Post[] = [];

  constructor() {}

  ngOnInit() {
    this.fetchPosts();
  }

  public async fetchPosts() {
    const firestore = getFirestore();
    const querySnapshot = await getDocs(collection(firestore, "workspaces"));
    querySnapshot.forEach((workspace) => {
      const organization = workspace.data()['organization'];
      const workspaceId = workspace.id;
      const posts = workspace.data()['posts'];
      posts.forEach((post: any) => {
        if (post['isDeleted'] == false && post['visibility'] == 'public' && post['status'] == 'published') {
          this.table.push({
            workspaceId: workspaceId,
            id: post['id'],
            title: post['title'],
            HTMLContent: post['HTMLContent'],
            timestamp: post['timestamp'],
            status: post['status'],
            visibility: post['visibility'],
            author: organization['organization_name'],
          });
          return;
        }
      });
    });
  }
}
