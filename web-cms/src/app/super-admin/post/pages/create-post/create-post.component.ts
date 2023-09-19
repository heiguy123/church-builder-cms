import { CommonModule } from '@angular/common';
import { AfterContentInit, AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HtmlEditorService, ImageService, LinkService, RichTextEditorModule, ToolbarService } from '@syncfusion/ej2-angular-richtexteditor';
import { doc, getDoc, getFirestore, setDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, RichTextEditorModule ],
  providers: [ CookieService, ToolbarService, LinkService, ImageService, HtmlEditorService ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePostComponent implements OnInit {
  form!: FormGroup;
  isPublished: boolean = false;
  
  constructor(private cookieService: CookieService, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({ 
      post: new FormGroup({
        title: new FormControl(null, [Validators.required,]),
        HTMLContent: new FormControl(null, [Validators.required,]),
        visibility: new FormControl(null, [Validators.required,]),
      }),
    });
  }

  saveDraft() {
    this.isPublished = false;
  }

  publish() {
    this.isPublished = true;
  }

  async onSubmit() {
    console.log(this.form.value, + "is published: " + this.isPublished.toString());

    if (this.form.invalid) {
      return;
    }

    // 1. Create a new post document in firestore by adding a new array to document 'posts'
    const firestore = getFirestore();
    const workspaceId = this.cookieService.get('workspaceID');
    const post = this.form.value.post;

    let docRef = doc(firestore, 'workspaces', workspaceId);
    let docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const posts = docSnap.data()['posts'];
      const newPost = {
        id: posts.length + 1,
        title: post.title,
        HTMLContent: post.HTMLContent,
        visibility: post.visibility,
        status: (this.isPublished? 'published' : 'draft'),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      posts.push(newPost);
      await setDoc(doc(firestore, 'workspaces', workspaceId), { posts: posts }, { merge: true });
      console.log('Post created in firestore. Id: ' + newPost.id);

      this.router.navigate(['/super-admin/post/app-view-post']);
    }
  }
}
