import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { doc, getDoc, getFirestore, updateDoc } from '@angular/fire/firestore';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone : true,
  providers: [ CookieService ],
  imports: [ CommonModule, ReactiveFormsModule ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  table: User[] = [];
  form!: FormGroup;

  constructor(
    private cookieService: CookieService, 
    private router : Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({ 
      user: new FormGroup({
        userId: new FormControl(null, [Validators.required,]),
        email: new FormControl({value: null, disabled: true}, [Validators.required,]),
        firstName: new FormControl(null),
        lastName: new FormControl(null),
        role: new FormControl({value: null, disabled: true}, [Validators.required,]),
      }),
    });

    this.fetchUser();
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

  async fetchUser() {
    const firestore = getFirestore();
    const workspaceID = this.cookieService.get('workspaceID');
    const userID = this.cookieService.get('id');
    let docRef = doc(firestore, "workspaces", workspaceID);
    let docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const users = docSnap.data()['users'];
      const user = users.find((user: any) => user.id === userID);
      if (user !== undefined) {
        this.table = [
          {
            userId: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
          }
        ];

        this.form.controls['user'].setValue({
          userId: this.table[0].userId,
          email: this.table[0].email,
          firstName: this.table[0].firstName,
          lastName: this.table[0].lastName,
          role: this.table[0].role,
        });
        return;
      }
      this.toastrMsg('error', 'User Not Found.');
    }
    this.toastrMsg('error', 'Workspace Not Found.');
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
        user.firstName = this.form.value.user.firstName;
        user.lastName = this.form.value.user.lastName;
        await updateDoc(docRef, {
          users: users,
        });
        this.toastrMsg('success', 'User Updated.');
        this.router.navigate(['/admin/auth/app-profile']);
        return;
      }
      this.toastrMsg('error', 'User Not Found.');
    }
    this.toastrMsg('error', 'Workspace Not Found.');
  }
}
