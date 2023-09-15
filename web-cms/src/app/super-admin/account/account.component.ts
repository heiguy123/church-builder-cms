import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  standalone: true,
  imports: [ RouterOutlet ],
})
export class AccountComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
