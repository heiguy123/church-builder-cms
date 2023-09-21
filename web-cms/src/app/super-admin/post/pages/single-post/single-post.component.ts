import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Post } from '../../models/post';
import { ActivatedRoute, Router } from '@angular/router';
import { doc, getDoc, getFirestore, setDoc, updateDoc } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HtmlEditorService, ImageService, LinkService, RichTextEditorModule, ToolbarService } from '@syncfusion/ej2-angular-richtexteditor';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss'],
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, RichTextEditorModule ],
  providers: [ CookieService, ToolbarService, LinkService, ImageService, HtmlEditorService ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SinglePostComponent implements OnInit {
  table: Post[] = [];
  form!: FormGroup;
  isDeleted: boolean = false;

  constructor(
    private cookieService: CookieService,
    private route: ActivatedRoute,
    private router : Router,
    private toastr: ToastrService,
  ) { }

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
        status: new FormControl(null),
        timestamp: new FormControl(null),
        id: new FormControl(null),
      }),
    });
    
    const postId = this.route.snapshot.paramMap.get('id');
    console.log("Post id: " + postId);
    this.fetchPost(postId!);
  }

  deletePost() {
    this.isDeleted = true;
  }

  async fetchPost(postId: string) {
    const workspaceId = this.cookieService.get('workspaceID');
    const firestore = getFirestore();
    let docRef = doc(firestore, 'workspaces', workspaceId);
    let docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const posts = docSnap.data()['posts'];
      const post = posts.find((post: any) => post.id == postId);
      if (post != undefined) {
        this.table = [
          {
            id: post.id,
            title: post.title,
            HTMLContent: post.HTMLContent,
            timestamp: post.timestamp,
            status: post.status,
            visibility: post.visibility
          }
        ];

        this.form.controls['post'].setValue({
          title: this.table[0].title,
          HTMLContent: this.table[0].HTMLContent,
          visibility: this.table[0].visibility,
          status: this.table[0].status,
          timestamp: this.table[0].timestamp,
          id: this.table[0].id,
        });
        return;
      }
      this.toastrMsg('error', 'Failed to fetch post.');
      return;
    }
    this.toastrMsg('error', 'Failed to fetch post.');
    return;
  }

  async onSubmit() {
    if (this.form.invalid) {
      this.toastrMsg('error', 'Please fill in all required fields.');
      return;
    }

    const firestore = getFirestore();
    const workspaceId = this.cookieService.get('workspaceID');
    const post = this.form.value.post;
    const postId = post.id;

    let docRef = doc(firestore, 'workspaces', workspaceId);
    let docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const posts = docSnap.data()['posts'];
      const post = posts.find((post: any) => post.id === postId);
      if (post !== undefined) {
        post.title = this.form.value.post.title;
        post.HTMLContent = this.form.value.post.HTMLContent;
        post.visibility = this.form.value.post.visibility;
        post.status = this.form.value.post.status;
        post.timestamp = post.timestamp.concat([new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()]);
        post.isDeleted = this.isDeleted;
        await updateDoc(docRef, {
          posts: posts,
        });
        if (this.isDeleted) {
          this.toastrMsg('success', 'Post deleted.');
        } else {
          this.toastrMsg('success', 'Post updated.');
        }
        this.router.navigate(['/super-admin/post/app-view-post']);
        return;
      }
      this.toastrMsg('error', 'Failed to update post.');
      return;
    }
    this.toastrMsg('error', 'Failed to update post.');
    return;
  }
}
