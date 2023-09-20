import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-app-builder',
  templateUrl: './app-builder.component.html',
  standalone: true,
  imports: [ RouterOutlet ],
})
export class AppBuilderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
