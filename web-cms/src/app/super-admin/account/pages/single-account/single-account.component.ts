import { Component, OnInit } from '@angular/core';
import { Account } from '../../models/account';
import { ActivatedRoute } from '@angular/router';
import { doc, getDoc, getFirestore } from '@angular/fire/firestore';
import { CookieService } from 'ngx-cookie-service';

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
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    this.fetchUserAccount(userId!);
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
    }
  }
}
