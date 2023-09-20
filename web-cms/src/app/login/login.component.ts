import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { getAuth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { collection, doc, getDoc, getDocs, getFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [CookieService],
})
export class LoginComponent implements OnInit { 
  form!: FormGroup;

  constructor (
    private router: Router,
    private cookieService: CookieService,
    private toastr: ToastrService,
  ) { }

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
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required,]),
    });
  }

  async onSubmit() : Promise<void> {
    if (!this.form.valid) {
      this.toastrMsg('error', 'Please fill in all required fields.');
      return;
    }

    // 1. Check if email and password are in database
    const auth = getAuth();
    const email = this.form.value.email;
    const password = this.form.value.password;
    let user = auth.currentUser;

    if (email != null && password != null) {
      await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        // Signed in
        user = userCredential.user;
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        this.toastrMsg('error', errorMessage);
      });
    }

    if (user != null) {
      // 2. If valid, check if user is master, super, or admin in firestore roles
      const firestore = getFirestore();
      const userID = user.uid;

      let docRef = doc(firestore, 'master', userID);
      let docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        this.form.reset();

        // set coookies

        this.cookieService.set('id', userID, { expires: 1, sameSite: 'Lax'});
        this.cookieService.set('email', email, { expires: 1, sameSite: 'Lax'});
        this.cookieService.set('role', 'master', { expires: 1, sameSite: 'Lax'});
        console.log('Cookie set. Id: ' + this.cookieService.get('id') + ', Email: ' + this.cookieService.get('email') + ', Role: ' + this.cookieService.get('role'));
        this.toastrMsg('success', 'Signed in successfully.');
        this.router.navigate(['/master-admin']);
      } else {
        // read from user requests (for those who are not yet activated)
        docRef = doc(firestore, 'user-requests', userID);
        docSnap = await getDoc(docRef);
    
        if (docSnap.exists()) {
          if (!docSnap.data()['activated']) {
            this.toastrMsg('error', 'Your account is not activated yet. Please contact your administrator.');
            return;
          }
        }

        // esle, read through every workspace and find if the user existed
        const querySnapshot = await getDocs(collection(firestore, "workspaces"));
        querySnapshot.forEach((workspace) => {
          const userdb = workspace.data()['users'];
          userdb.forEach((user: { [x: string]: any; }) => {
            const user_id = user['id'];

            if (user_id == userID) {
              this.cookieService.set('id', userID, { expires: 1, sameSite: 'Lax'});
              this.cookieService.set('email', email, { expires: 1, sameSite: 'Lax'});
              this.cookieService.set('workspaceID', workspace.id, { expires: 1, sameSite: 'Lax'});
              if (user['role'] == "super") {
                this.cookieService.set('role', 'super', { expires: 1, sameSite: 'Lax'});
                console.log('Cookie set. Id: ' + this.cookieService.get('id') + ', Email: ' + this.cookieService.get('email') + ', Role: ' + this.cookieService.get('role') + ', Workspace ID: ' + this.cookieService.get('workspaceID'));
                this.toastrMsg('success', 'Signed in successfully.');
                this.router.navigate(['/super-admin']);
                return;
              } else if (user['role'] == "admin") {
                this.cookieService.set('role', 'admin', { expires: 1, sameSite: 'Lax'});
                console.log('Cookie set. Id: ' + this.cookieService.get('id') + ', Email: ' + this.cookieService.get('email') + ', Role: ' + this.cookieService.get('role') + ', Workspace ID: ' + this.cookieService.get('workspaceID'));
                this.toastrMsg('success', 'Signed in successfully.');
                this.router.navigate(['/admin']);
                return;
              }
            }
          });
        });
        this.form.reset();
        return;
      }
    } else {
      this.toastrMsg('error', 'Invalid email or password.');
      return;
    }
  }


  goToRegister() : void {
    this.router.navigate(['/register']);
  }

  goToForgot() : void {
    this.toastrMsg('success', 'Forgot Password is triggered.');
  }
}
