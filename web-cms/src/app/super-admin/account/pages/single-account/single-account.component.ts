import { Component, OnInit } from '@angular/core';
import { Account } from '../../models/account';
import { ActivatedRoute, Router } from '@angular/router';
import { doc, getDoc, getFirestore, updateDoc } from '@angular/fire/firestore';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-single-account',
  templateUrl: './single-account.component.html',
  styleUrls: ['./single-account.component.scss'],
  standalone: true,
  providers: [ CookieService ]
})
export class SingleAccountComponent implements OnInit {
  table: Account[] = [];
  
  constructor(
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private router : Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    this.fetchUserAccount(userId!);
  }

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

  async fetchUserAccount(userId: string) {
    const firestore = getFirestore();
    const userID = userId;
    const workspaceId = this.cookieService.get('workspaceID');
    console.log(workspaceId);
    let docRef = doc(firestore, 'workspaces', workspaceId);
    let docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const users = docSnap.data()['users'];
      const user = users.find((user: any) => user.id === userID);
      if (user !== undefined) {
        this.table = [
          {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            activated: user.activated,
          }
        ];
        return;
      }
      this.toastrMsg('error', 'User Not Found.');
    }
    this.toastrMsg('error', 'Workspace Not Found.');
  }

  async deactivateAccount() {
    // Update the user account to be deactivated
    const firestore = getFirestore();
    const userID = this.table[0].id;
    const workspaceId = this.cookieService.get('workspaceID');
    let docRef = doc(firestore, 'workspaces', workspaceId);
    let docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const users = docSnap.data()['users'];
      const user = users.find((user: any) => user.id === userID);
      if (user !== undefined) {
        user.activated = false;
        await updateDoc(docRef, {
          users: users,
        });
        this.toastrMsg('success', 'Account Deactivated.');
        this.router.navigate(['/super-admin/account/app-view-account']);
        return;
      }
      this.toastrMsg('error', 'User Not Found.');
    }
    this.toastrMsg('error', 'Workspace Not Found.');
  }
}
