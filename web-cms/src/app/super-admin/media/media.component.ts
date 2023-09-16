import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  standalone: true,
  imports: [ RouterOutlet ],
})
export class MediaComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}