import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HTMLRichTextEditorComponent } from '../../components/html-rich-text-editor/html-rich-text-editor.component';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, HTMLRichTextEditorComponent ],
  providers: [ CookieService ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePostComponent implements OnInit {
  form!: FormGroup;
  
  constructor(private cookieService: CookieService, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({ 
      post: new FormGroup({
        title: new FormControl(null, [Validators.required,]),
        HTMLContent: new FormControl(null, [Validators.required,]),
        category: new FormControl(null, [Validators.required,]),
        tags: new FormControl(null, [Validators.required,]),
      }),
    });
  }

  onSubmit(): void {
  }
}
