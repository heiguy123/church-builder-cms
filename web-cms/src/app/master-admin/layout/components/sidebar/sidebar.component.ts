import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { Router, RouterLink } from '@angular/router';
import { SidebarMenuComponent } from './sidebar-menu/sidebar-menu.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NgClass, NgIf } from '@angular/common';
import { getAuth, signOut } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private router: Router, public menuService: MenuService, private toastr: ToastrService,) {}

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

  ngOnInit(): void {}

  public toggleSidebar() {
    this.menuService.toggleSidebar();
  }

  public signOut() {
    const auth = getAuth();
    signOut(auth).then(() => {
      this.toastrMsg('success', 'Signed out successfully.');
      this.router.navigate(['/login']);
    }).catch((error) => {
      this.toastrMsg('error', 'Failed to sign out.');
    });
  }
}
