import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Post } from '../../models/post';
import { ActivatedRoute, Router } from '@angular/router';
import { doc, getDoc, getFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss'],
  standalone: true,
  providers: [ CookieService ]
})
export class SinglePostComponent implements OnInit {
  table: Post[] = [];

  constructor(
    private cookieService: CookieService,
    private route: ActivatedRoute,
    private router : Router  
  ) { }

  ngOnInit(): void {
    const postId = this.route.snapshot.paramMap.get('id');
    this.fetchPost(postId!);
  }

  async fetchPost(postId: string) {
    const workspaceId = this.cookieService.get('workspaceID');
    const firestore = getFirestore();
    let docRef = doc(firestore, 'workspaces', workspaceId);
    let docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const posts = docSnap.data()['posts'];
      const post = posts.find((post: any) => post.id === postId);
      if (post !== undefined) {
        this.table = [
          {
            id: post.id,
            title: post.title,
            HTMLContent: post.HTMLContent,
            timestamp: post.timestamp,
            status: post.status,
          }
        ];
        return;
      }
    }
  }

  

}
