import { Component, OnInit } from '@angular/core';
import { UserRequest } from '../../models/user-request';
import { RequestTableItemComponent } from '../request-table-item/request-table-item.component';
import { CommonModule } from '@angular/common';
import { QuerySnapshot, collection, doc, getDoc, getDocs, getFirestore } from '@angular/fire/firestore';



@Component({
  selector: '[app-request-table]',
  templateUrl: './request-table.component.html',
  standalone: true,
  imports: [RequestTableItemComponent, CommonModule],
})
export class RequestTableComponent implements OnInit {

  public activeTable: UserRequest[] = [];

  constructor() {
  }
  
  ngOnInit(): void {
    this.fetchUserRequests();
  }
 
  async fetchUserRequests() {
    const firestore = getFirestore();
    const querySnapshot = await getDocs(collection(firestore, "user-requests"));

    // Extract the data and sort it by docCreatedDate in descending order
    const sortedData = querySnapshot.docs.map(doc => {
      const creationDate = new Date(doc.data()['docCreatedDate']); // convert to number
      return {
        request_id: doc.id,
        creation_date: creationDate.toISOString(), // Convert back to ISO string
        organization_name: doc.data()['orgName'],
        applicant_email: doc.data()['email'],
        document_link: doc.data()['docUrl'],
        activated: doc.data()['activated'],
        applicant_first_name: doc.data()['firstName'],
        applicant_last_name: doc.data()['lastName'],
        organization_address: doc.data()['orgAddress'],
        organization_city: doc.data()['orgCity'],
        organizatiton_denomination: doc.data()['orgDenomination'],
        organization_member_size: doc.data()['orgMemberSize'],
        organization_state: doc.data()['orgState'],
        organization_zip: doc.data()['orgZip']
      };
    }).sort((a, b) => b.creation_date.localeCompare(a.creation_date)); // Sort in descending order

    // Push sorted data to activeTable
    this.activeTable.push(...sortedData);
  }
}