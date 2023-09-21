import { CommonModule } from '@angular/common';
import { AfterContentInit, AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HtmlEditorService, ImageService, LinkService, RichTextEditorModule, ToolbarService } from '@syncfusion/ej2-angular-richtexteditor';
import { doc, getDoc, getFirestore, setDoc } from '@angular/fire/firestore';
import { DateTime } from '@syncfusion/ej2/charts';
import { ToastrService } from 'ngx-toastr';

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
  
  constructor(private cookieService: CookieService, private router: Router, private toastr: ToastrService,) {}

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

    if (this.form.invalid) {
      this.toastrMsg('error', 'Please fill in all required fields.');
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
        timestamp: [new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()],
        isDeleted: false,
      };
      posts.push(newPost);
      await setDoc(doc(firestore, 'workspaces', workspaceId), { posts: posts }, { merge: true });
      this.toastrMsg('success', 'Post created successfully. Id: ' + newPost.id);
      this.router.navigate(['/admin/post/app-view-post']);
      return;
    }
    this.toastrMsg('error', 'Failed to create post.');
    return;
  }
}
