import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { createUserWithEmailAndPassword, getAuth } from '@angular/fire/auth';
import { addDoc, doc, getDoc, getFirestore, setDoc } from '@angular/fire/firestore';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { collection } from '@firebase/firestore';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [ CookieService ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateAccountComponent implements OnInit {
  form!: FormGroup;
  
  constructor(private cookieService: CookieService, private router : Router, private toastr: ToastrService,) {}

  ngOnInit(): void {
    this.form = new FormGroup({ 
      user: new FormGroup({
        firstName: new FormControl(null, [Validators.required,]),
        lastName: new FormControl(null, [Validators.required,]),
        email: new FormControl(null, [Validators.required,]),
        password: new FormControl(null, [Validators.required,]),
        userRole: new FormControl(null, [Validators.required,]),
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

    // 1. Create a new user account in firebase auth
    const auth = getAuth();
    const { email, password } = this.form.value.user;
    let user = auth.currentUser;

    await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
      // Signed in
      user = userCredential.user;
      this.toastrMsg('success', 'User created successfully. Id: ' + user.uid);
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      this.toastrMsg('error', 'Error creating user in firebase auth. Code: ' + errorCode + ' Message: ' + errorMessage);
      return;
    });

    // 2. Create a new user document in firestore by adding a new array to document 'users'
    const firestore = getFirestore();
    const userID = user!.uid;
    const workspaceId = this.cookieService.get('workspaceID');

    let docRef = doc(firestore, 'workspaces', workspaceId);
    let docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const users = docSnap.data()['users'];
      const user = users.find((user: any) => user.id === userID);
      if (user === undefined) {
        const newUser = {
          id: userID,
          firstName: this.form.value.user.firstName,
          lastName: this.form.value.user.lastName,
          email: this.form.value.user.email,
          role: this.form.value.user.userRole,
          activated: true,
        };
        users.push(newUser);
        await setDoc(doc(firestore, 'workspaces', workspaceId), { users: users }, { merge: true });
        this.toastrMsg('success', 'User created in firestore. Id: ' + userID);

        // 3. Send a verification email to the user
        this.sendEmailToNewUser();
        this.toastrMsg('success', 'Verification email sent to ' + this.form.value.user.email + '.');
        this.router.navigate(['super-admin/account/app-view-account']);
        return;
      }
      this.toastrMsg('error', 'User already exists.');
    }
    this.toastrMsg('error', 'Workspace Not Found.');
  }

  async sendEmailToNewUser() {
    const recipient = this.form.value.applicant.email;
    const recipientName = this.form.value.applicant.firstName + ' ' + this.form.value.applicant.lastName;

    const firestore = getFirestore();

    const newDoc = await addDoc(collection(firestore, "mail"), {
      to: recipient,
      message: {
        subject: 'Congrats! ' + recipientName + ' (' + recipient + ')',
        text: 'Your application has been approved. Please login to the dashboard to start using the app.',
        html: 'Your application has been approved. Please login to the dashboard to start using the app.',
      }
    });
  }
}
