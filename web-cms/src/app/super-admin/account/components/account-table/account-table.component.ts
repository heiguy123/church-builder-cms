import { Component, OnInit } from '@angular/core';
import { AccountTableItemComponent } from '../account-table-item/account-table-item.component';
import { CommonModule } from '@angular/common';
import { Account } from '../../models/account';
import { collection, doc, getDoc, getDocs, getFirestore } from '@angular/fire/firestore';
import { CookieService } from 'ngx-cookie-service';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: '[app-account-table]',
  templateUrl: './account-table.component.html',
  standalone: true,
  imports: [ AccountTableItemComponent, CommonModule, RouterLink ],
  providers: [ CookieService ]
})
export class AccountTableComponent implements OnInit {
  public activeTable : Account[] = [];

  constructor(private cookieService: CookieService, private toastr: ToastrService,) {}

  ngOnInit(): void {
    this.fetchAccounts();
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

  async fetchAccounts() {
    const firestore = getFirestore();
    const workspaceID = this.cookieService.get('workspaceID');
    await getDoc(doc(firestore, "workspaces", workspaceID))
    .then((doc) => { 
      if (doc.exists()) {
        const users = doc.data()['users'];
        users.forEach((user: any) => {
          this.activeTable.push({
            id: user['id'],
            email: user['email'],
            firstName: user['firstName'],
            lastName: user['lastName'],
            role: user['role'],
            activated: user['activated']
          });
        });
        return;
      }
      this.toastrMsg('error', 'Workspace Not Found.');
    });
  };
}
