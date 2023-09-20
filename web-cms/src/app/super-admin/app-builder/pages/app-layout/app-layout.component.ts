import { Component, OnInit } from '@angular/core';
import { doc, getDoc, getFirestore } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { updateDoc } from '@firebase/firestore';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
  standalone: true,
  imports: [FormsModule],
  providers: [ CookieService ]
})
export class AppLayoutComponent implements OnInit {
  selectedLayout: string = '';

  constructor(private router: Router, private cookieService : CookieService) { }

  ngOnInit(): void {}

  updateLayout(layout: string) {
    this.selectedLayout = layout;
  }

  async saveSelection() {
    window.alert('Saving selection... :' + this.selectedLayout);
    // save to firestore workspace field
    const firestore = getFirestore();
    const workspaceID = this.cookieService.get('workspaceID');
    let docRef = doc(firestore, 'workspaces', workspaceID);
    let docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      let appLayout = docSnap.data()['appLayout'];
      appLayout['userOption'] = this.selectedLayout;
      await updateDoc(docRef, {
        appLayout: appLayout
      })
    }
  }

  deployApp() {
    this.saveSelection();
    this.router.navigate(['/super-admin/app-builder/app-deploy-app']);
  }
}
