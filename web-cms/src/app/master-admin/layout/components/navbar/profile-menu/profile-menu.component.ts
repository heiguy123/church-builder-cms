import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { ClickOutsideDirective } from '../../../../../shared/directives/click-outside.directive';
import { Auth, getAuth, onAuthStateChanged, signOut } from '@angular/fire/auth';
import { doc, getDoc, getFirestore } from '@angular/fire/firestore';

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

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.getUserInfo();
  }

  public toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
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