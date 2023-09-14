import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserRequest } from '../../models/user-request';
import { addDoc, collection, doc, getDoc, getFirestore, updateDoc } from '@angular/fire/firestore';
import { getMetadata, getStorage, ref, uploadString } from '@angular/fire/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-single-user-request',
  templateUrl: './single-user-request.component.html',
  standalone: true,
  styleUrls: ['./single-user-request.component.scss']
})
export class SingleUserRequestComponent implements OnInit {
  table: UserRequest[] = [];
  private userCredentials = { email: '', password: '' };

  constructor(private route: ActivatedRoute, private router : Router) { }

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id'); // Use the correct parameter name
    this.fectchUserRequest(userId!);
  }

  async fectchUserRequest(userId: string) {
    const firestore = getFirestore();
    const userID = userId;
    const docRef = doc(firestore, 'user-requests', userID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      this.table = [
        {
          request_id: userId,
          creation_date: docSnap.data()['docCreatedDate'],
          organization_name: docSnap.data()['orgName'],
          applicant_email: docSnap.data()['email'],
          document_link: docSnap.data()['docUrl'],
          activated: docSnap.data()['activated'],
          applicant_first_name: docSnap.data()['firstName'],
          applicant_last_name: docSnap.data()['lastName'],
          organization_address: docSnap.data()['orgAddress'],
          organization_city: docSnap.data()['orgCity'],
          organizatiton_denomination: docSnap.data()['orgDenomination'],
          organization_member_size: docSnap.data()['orgMemberSize'],
          organization_state: docSnap.data()['orgState'],
          organization_zip: docSnap.data()['orgZip']
        },
      ];
    }
  }

  async approveRequest() {
    // TODO: Update the user request to be approved
    const firestore = getFirestore();
    const userID = this.table[0].request_id;
    const docRef = doc(firestore, 'user-requests', userID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await updateDoc(docRef, {
        activated: true,
      });
      this.userCredentials = {
        email: docSnap.data()['email'],
        password: docSnap.data()['password'],
      };
    }
    console.log('User request approved');

    // TODO: Create workspace for the organization
    // and duplicate the user for the organization -> users collection
    // set the user's role to be 'super admin'
    let workspaceId = '';

    addDoc(collection(firestore, 'workspaces'), {
      organization: {
        organization_name: this.table[0].organization_name,
        organization_address: this.table[0].organization_address,
        organization_city: this.table[0].organization_city,
        organizatiton_denomination: this.table[0].organizatiton_denomination,
        organization_member_size: this.table[0].organization_member_size,
        organization_state: this.table[0].organization_state,
        organization_zip: this.table[0].organization_zip,
      },
      users: [{
        id: this.table[0].request_id,
        email: this.userCredentials.email,
        password: this.userCredentials.password,
        firstName: this.table[0].applicant_first_name,
        lastName: this.table[0].applicant_last_name,
        role: 'super',
        activated: true,
      }],
    }).then((docRef) => {
      workspaceId = docRef.id;
      console.log('New workspace added with ID: ', workspaceId);

      // TODO: Create workspace folder in Firebase Storage
      const storage = getStorage();
      const workspaceFolderRef = ref(storage, `workspaces/${workspaceId}/init.txt`);
      getMetadata(workspaceFolderRef).then(() => {
        console.log('Workspace folder existed');
      }).catch((error) => {
        if (error.code === 'storage/object-not-found') {
          console.log('Workspace folder does not exist, creating...');
          uploadString(workspaceFolderRef, `Workspace ${workspaceId} is created.`, 'raw');
        } else {
          console.error(`Error checking folder for workspace ${workspaceId}:`, error);
        }
      }).then(() => {
        console.log(`Folder for workspace ${workspaceId} created.`);
      }).catch((error) => {
        console.error(`Error creating folder for workspace ${workspaceId}:`, error);
      });
    }).catch((error) => {
      console.error('Error adding new workspace: ', error);
    });

    // TODO: Send email to user
    const recipient = this.table[0].applicant_email;
    const recipientName = this.table[0].applicant_first_name + ' ' + this.table[0].applicant_last_name;

    const newDoc = await addDoc(collection(firestore, "mail"), {
      to: recipient,
      message: {
        subject: 'Congrats! ' + recipientName + ' (' + recipient + ')',
        text: 'Your application has been approved. Please login to the dashboard to start using the app.',
        html: 'Your application has been approved. Please login to the dashboard to start using the app.',
      }
    });
    
    this.router.navigate(['master-admin/dashboard/app-user-request']);
  }

  async rejectRequest() {
    const firestore = getFirestore();

    // TODO: Send email to user
    const recipient = this.table[0].applicant_email;
    const recipientName = this.table[0].applicant_first_name + ' ' + this.table[0].applicant_last_name;

    const newDoc = await addDoc(collection(firestore, "mail"), {
      to: recipient,
      message: {
        subject: 'Sorry! ' + recipientName + ' (' + recipient + ')',
        text: 'Your application has been denied.',
        html: 'Your application has been denied.',
      }
    });

    this.router.navigate(['master-admin/dashboard/app-user-request']);
  }
}