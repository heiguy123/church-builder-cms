import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  standalone: true,
  imports: [ RouterOutlet ],
})
export class PostComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
