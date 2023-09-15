import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { StepperComponent } from '../stepper/stepper.component';
import { Router } from '@angular/router';
import { addDoc, collection, getFirestore, doc, updateDoc, setDoc } from '@angular/fire/firestore';
import { getDownloadURL, getMetadata, getStorage, ref, uploadBytesResumable } from '@angular/fire/storage';
import { createUserWithEmailAndPassword, getAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-multi-step-form',
  standalone: true,
  imports: [CommonModule, StepperComponent, ReactiveFormsModule],
  templateUrl: './multi-step-form.component.html',
  styleUrls: ['./multi-step-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiStepFormComponent implements OnInit {
  currentStep = 1;
  lastPage = false;
  form!: FormGroup;
  states : any = ['Johor','Kedah','Kelantan','Malacca','Negeri Sembilan','Pahang','Penang',
          'Perak','Perlis','Sabah','Sarawak','Selangor','Terengganu','Kuala Lumpur','Labuan','Putrajaya'];
  show: boolean = false;

  constructor (
    private router: Router,
  ) { 
    this.show = false;
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      organization: new FormGroup({
        name: new FormControl(null, [Validators.required,]),
        denomination: new FormControl(null, [Validators.required,]),
        address: new FormControl(null, [Validators.required,]),
        city: new FormControl(null, [Validators.required,]),
        state: new FormControl(null, [Validators.required,]),
        zip: new FormControl(null, [Validators.required,]),
        memberSize: new FormControl(null, [Validators.required,]),
      }),
      applicant: new FormGroup({
        firstName: new FormControl(null, [Validators.required,]),
        lastName: new FormControl(null, [Validators.required,]),
        email: new FormControl(null, [Validators.required,]),
        password: new FormControl(null, [Validators.required,]),
        document: new FormControl(null, [Validators.required,]),
      }),
    });
  }

  async onSubmit() {
    this.lastPage = true;

    // 1. Create a new user account in firebase auth
    const auth = getAuth();
    const email = this.form.value.applicant.email;
    const password = this.form.value.applicant.password;
    let user = auth.currentUser;

    await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
      // Signed in 
      user = userCredential.user;
      console.log('User created in firebase auth. Id: ' + user.uid);
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode + ": " + errorMessage);
    });

    // 2. save user details to cloud firestore at first
    const firestore = getFirestore();
    const userID = user!.uid;

    const newDoc = await setDoc(doc(firestore, "user-requests", userID), {
      orgName: this.form.value.organization.name,
      orgDenomination: this.form.value.organization.denomination,
      orgAddress: this.form.value.organization.address,
      orgCity: this.form.value.organization.city,
      orgState: this.form.value.organization.state,
      orgZip: this.form.value.organization.zip,
      orgMemberSize: this.form.value.organization.memberSize,
      firstName: this.form.value.applicant.firstName,
      lastName: this.form.value.applicant.lastName,
      email: this.form.value.applicant.email,
      password: this.form.value.applicant.password,
      activated: false,
      docName: '',
      docCreatedDate: '',
      docUrl: '',
    });
    console.log("User data stored in firestore. Id: " + userID);

    // 3. upload document to storage
    this.uploadFile().then(async (docMetaData: any) => {
      console.log('Image upload finished! update database');
      
      // 4. update exisitng database record
      const docRef = doc(firestore, "user-requests", userID);
      await updateDoc(docRef, {
        docName: docMetaData.fullPath,
        docCreatedDate: docMetaData.timeCreated,
        docUrl: docMetaData.url,
      });
      console.log('Database updated!');
    });

    // 5. send email to master admin
    this.sendEmailToMasterAdmin();

    this.form.reset();
  }

  onFileChange(event: any) {
    this.form.value.applicant.document = event.target.files[0];
  }

  uploadFile() {
    return new Promise(async (resolve, reject) => {
      const storage = getStorage();
      const storageRef = ref(storage);
      var docMetaData = {
        fullPath: '',
        timeCreated: '',
        url: '',
      };

      const fileRef = ref(storageRef, this.form.value.applicant.document.name);
      const uploadTask = uploadBytesResumable(fileRef, this.form.value.applicant.document);

      uploadTask.on('state_changed',
        (snapshot) => {
          // progress function
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          // error function
          console.log(error);
          reject(error);
        },
        async () => {
          // complete function
          await getMetadata(uploadTask.snapshot.ref).then((metadata) => {
            docMetaData.fullPath = metadata.fullPath;
            docMetaData.timeCreated = metadata.timeCreated;
          });
          await getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            docMetaData.url = url;
          });
          console.log(docMetaData);
          resolve(docMetaData);
        }
      );
    });
  }

  goToLogin() : void {
    this.router.navigate(['/login']);
  }

  goToForgot() : void {
    this.router.navigate(['/forgot']);
  }

  showPassword() {
    this.show = !this.show;
  }

  changePage(isNextPage: boolean) {

    if (isNextPage) {
      this.currentStep++;
    } else {
      this.currentStep--;
    }
  }

  async sendEmailToMasterAdmin() {
    const recipient = this.form.value.applicant.email;
    const recipientName = this.form.value.applicant.firstName + ' ' + this.form.value.applicant.lastName;

    const firestore = getFirestore();

    const newDoc = await addDoc(collection(firestore, "mail"), {
      to: recipient,
      message: {
        subject: 'New user registratio from ' + recipientName + ' (' + recipient + ')',
        text: 'New user registration from ' + recipientName + ' (' + recipient + ')',
        html: 'New user registration from ' + recipientName + ' (' + recipient + ')'+ 
        '\nPlease login the dashboard to approve the registration.',
      }
    });

    console.log("Email data stored in firestore. Id: " + newDoc.id);
  }
}