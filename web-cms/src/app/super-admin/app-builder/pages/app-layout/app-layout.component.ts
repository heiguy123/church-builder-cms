import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
  standalone: true,
  imports: [FormsModule]
})
export class AppLayoutComponent implements OnInit {
  selectedLayout: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {}

  updateLayout(layout: string) {
    // This function is triggered when the user selects a different layout.
    // The selectedLayout variable is automatically updated via two-way binding (ngModel).
    this.selectedLayout = layout;
  }

  saveSelection() {
    window.alert('Saving selection... :' + this.selectedLayout);
  }

  deployApp() {
    this.saveSelection();
    this.router.navigate(['/super-admin/app-builder/app-deploy-app']);
  }
}
