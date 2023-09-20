import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { doc, getDoc, getFirestore, updateDoc } from '@angular/fire/firestore';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss'],
  standalone : true,
  providers: [ CookieService ],
  imports: [ CommonModule, ReactiveFormsModule ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewPasswordComponent implements OnInit {
  table: User[] = [];
  form!: FormGroup;

  constructor(
    private cookieService: CookieService, 
    private router : Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    const userId = this.cookieService.get('id');
    this.form = new FormGroup({ 
      user: new FormGroup({
        userId: new FormControl(userId, [Validators.required,]),
        password: new FormControl(null, [Validators.required,]),
      }),
    });
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

  async onSubmit() {
    if (this.form.invalid) {
      this.toastrMsg('error', 'Please fill in all required fields.');
      return;
    }

    const firestore = getFirestore();
    const workspaceID = this.cookieService.get('workspaceID');
    const user = this.form.value.user;
    const userID = user.userId;

    let docRef = doc(firestore, 'workspaces', workspaceID);
    let docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const users = docSnap.data()['users'];
      const user = users.find((user: any) => user.id === userID);
      if (user !== undefined) {
        user.password = this.form.value.user.password;
        await updateDoc(docRef, {
          users: users,
        });
        this.toastrMsg('success', 'Password Updated.');
        this.router.navigate(['/super-admin/auth/app-profile']);
        return;
      }
      this.toastrMsg('error', 'User Not Found.');
    }
    this.toastrMsg('error', 'Workspace Not Found.');
  }
}
