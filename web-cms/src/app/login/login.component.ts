import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { getAuth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { doc, getDoc, getFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit { 
  form!: FormGroup;

  constructor (
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required,]),
    });
  }

  async onSubmit() : Promise<void> {
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
        window.alert(errorCode + ": " + errorMessage);
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
        this.router.navigate(['/master-admin']);
      } else {
        docRef = doc(firestore, 'users', userID);
        docSnap = await getDoc(docRef);
    
        if (docSnap.exists()) {
          if (!docSnap.data()['activated']) {
            window.alert("Your account is not activated yet. Please contact your administrator.");
            return;
          }
    
          this.form.reset();
          
          if (docSnap.data()['role'] == "super") {
            this.router.navigate(['/super-admin']);
          } else if (docSnap.data()['role'] == "tech") {
            this.router.navigate(['/tech-admin']);
          } else if (docSnap.data()['role'] == "admin") {
            this.router.navigate(['/admin']);
          } else {
            window.alert("You are not authorized to access this page.");
          }
        }
      }
    }
  }


  goToRegister() : void {
    this.router.navigate(['/register']);
  }

  goToForgot() : void {
    this.router.navigate(['/forgot']);
  }
}
