import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { ClickOutsideDirective } from '../../../../../shared/directives/click-outside.directive';
import { Auth, getAuth, onAuthStateChanged, signOut } from '@angular/fire/auth';
import { doc, getDoc, getFirestore } from '@angular/fire/firestore';
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
})
export class ProfileMenuComponent implements OnInit {
  public isMenuOpen = false;
  profileName = "";
  profileEmail = "";

  constructor(private router: Router, private toastr: ToastrService,) {}

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

  public signOut() {
    const auth = getAuth();
    signOut(auth).then(() => {
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
          let docRef = doc(firestore, 'master', userID);
          let docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
          this.profileName = docSnap.data()['firstName'] + " " + docSnap.data()['lastName'];
          this.profileEmail = docSnap.data()['email'];
          } else {
            docRef = doc(firestore, 'users', userID);
            docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              this.profileName = docSnap.data()['firstName'] + " " + docSnap.data()['lastName'];
              this.profileEmail = docSnap.data()['email'];
            } else {
              console.log("No such user found!");
              this.router.navigate(['/login']);
            }
          }
        }
      }
    });    
  }
}