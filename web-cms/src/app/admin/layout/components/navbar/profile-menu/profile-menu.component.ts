import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { ClickOutsideDirective } from '../../../../../shared/directives/click-outside.directive';
import { Auth, getAuth, onAuthStateChanged, signOut } from '@angular/fire/auth';
import { collection, doc, getDoc, getDocs, getFirestore } from '@angular/fire/firestore';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-profile-menu',
    templateUrl: './profile-menu.component.html',
    styleUrls: ['./profile-menu.component.scss'],
    standalone: true,
    imports: [
        ClickOutsideDirective,
        NgClass,
        RouterLink,
    ],
    providers: [ CookieService ]
})
export class ProfileMenuComponent implements OnInit {
  public isMenuOpen = false;
  profileName = "";
  profileEmail = "";

  constructor(private router: Router, private cookieService: CookieService, private toastr: ToastrService,) {}

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
    this.getUserInfo();
  }

  public toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  public navigateToProfile(): void {
    this.router.navigate(['/admin/auth/app-profile']);
  }

  public signOut() {
    const auth = getAuth();
    signOut(auth).then(() => {
      if (this.cookieService.getAll()) {
        this.cookieService.deleteAll();
        this.toastrMsg('success', 'Cookie deleted.');
      }
      this.toastrMsg('success', 'Signed out successfully.');
      this.router.navigate(['/login']);
    }).catch((error) => {
      this.toastrMsg('error', 'Failed to sign out.');
    });
  }

  public getUserInfo() {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const firestore = getFirestore();
        const userID = getAuth().currentUser!.uid;
        console.log("User ID: " + userID);
        if (userID != null) {
          const querySnapshot = await getDocs(collection(firestore, "workspaces"));
          querySnapshot.forEach((workspace) => {
            const userdb = workspace.data()['users'];
            userdb.forEach((user: { [x: string]: any; }) => {
              const user_id = user['id'];

              if (user_id == userID) {
                this.profileName = user['firstName'] + " " + user['lastName'];
                this.profileEmail = user['email'];
              }
            });
            
          });
        }
      }
    });    
  }
}