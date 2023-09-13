import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserRequest } from '../../models/user-request';
import { doc, getDoc, getFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-single-user-request',
  templateUrl: './single-user-request.component.html',
  standalone: true,
  styleUrls: ['./single-user-request.component.scss']
})
export class SingleUserRequestComponent implements OnInit {
  table: UserRequest[] = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id'); // Use the correct parameter name
    this.fectchUserRequest(userId!);
  }

  async fectchUserRequest(userId: string) {
    const firestore = getFirestore();
    const userID = userId;
    const docRef = doc(firestore, 'users', userID);
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
          organizatiton_demonination: docSnap.data()['orgDemonination'],
          organization_member_size: docSnap.data()['orgMemberSize'],
          organization_state: docSnap.data()['orgState'],
          organization_zip: docSnap.data()['orgZip'],
          role: docSnap.data()['role']
        },
      ];
    }
  }
}