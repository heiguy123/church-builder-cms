import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { Router, RouterLink } from '@angular/router';
import { SidebarMenuComponent } from './sidebar-menu/sidebar-menu.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NgClass, NgIf } from '@angular/common';
import { getAuth, signOut } from '@angular/fire/auth';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [
      NgClass,
      NgIf,
      AngularSvgIconModule,
      SidebarMenuComponent,
      RouterLink,
  ],
})
export class SidebarComponent implements OnInit {

  constructor(private router: Router, public menuService: MenuService) {}

  ngOnInit(): void {}

  public toggleSidebar() {
    this.menuService.toggleSidebar();
  }

  public signOut() {
    const auth = getAuth();
    signOut(auth).then(() => {
      console.log('Sign-out successful.');
      this.router.navigate(['/login']);
    }).catch((error) => {
      console.log('An error happened.');
    });
  }
}
