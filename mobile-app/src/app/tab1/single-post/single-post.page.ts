import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { doc, getDoc, getFirestore } from '@angular/fire/firestore';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.page.html',
  styleUrls: ['./single-post.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SinglePostPage implements OnInit {
  public table: Post[] = [];

  constructor(private route: ActivatedRoute,) { }

  ngOnInit() {
    const postId = this.route.snapshot.params['id'];
    const workspaceId = this.route.snapshot.params['workspaceId'];
    this.fetchPost(postId!, workspaceId!);
  }

  async fetchPost(postId: string, workspaceId: string) {
    const firestore = getFirestore();
    let docRef = doc(firestore, 'workspaces', workspaceId);
    let docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const posts = docSnap.data()['posts'];
      const post = posts.find((post: any) => post.id == postId);
      if (post != undefined) {
        this.table = [
          {
            workspaceId: workspaceId,
            id: post.id,
            title: post.title,
            HTMLContent: post.HTMLContent,
            timestamp: post.timestamp,
            status: post.status,
            visibility: post.visibility,
            author: docSnap.data()['organization']['organization_name'],
          }
        ];
        console.log(this.table);
        return;
      }
    }
  }

}
