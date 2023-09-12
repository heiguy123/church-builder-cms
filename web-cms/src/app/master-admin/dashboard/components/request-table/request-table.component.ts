import { Component, OnInit } from '@angular/core';
import { UserRequest } from '../../models/user-request';
import { RequestTableItemComponent } from '../request-table-item/request-table-item.component';
import { CommonModule } from '@angular/common';



@Component({
  selector: '[app-request-table]',
  templateUrl: './request-table.component.html',
  standalone: true,
  imports: [RequestTableItemComponent, CommonModule],
})
export class RequestTableComponent implements OnInit {

  public activeTable: UserRequest[] = [];

  constructor() {
  this.activeTable = [
    {
      request_id: "OkcMdKYzACVIyzfJoFf5FQWa8r73",
      creation_date: "2023-09-08T16:52:42.409Z",
      organization_name: "St. Joseph Church",
      applicant_email: "moseslyh2001@gmail.com",
      document_link:
      "https://firebasestorage.googleapis.com/v0/b/ccms-app-builder.appspot.com/o/RUS-AE-001-BACK-TO-SCHOOL-WEB-PROMO-readajusted.jpg?alt=media&token=f1cbd6d6-f416-4b6a-8d55-b60b6a579b9b",
      activated: false,
      applicant_first_name: "Moses Lau",
      applicant_last_name: "Hieng",
      organization_address:
      "Vista Komanwel A, A1-03A-2, Jalan Jalil Perkasa 19, Bukit Jalil",
      organization_city: "Kuala Lumpur",
      organizatiton_demonination: "Catholicism",
      organization_member_size: "201 to 1000",
      organization_state: "Putrajaya",
      organization_zip: "57000",
      role: ""
    },
    {
      request_id: "OkcMdKYzACVIyzfJoFf5FQWa8r73",
      creation_date: "2023-09-08T16:52:42.409Z",
      organization_name: "St. Joseph Church",
      applicant_email: "moseslyh2001@gmail.com",
      document_link:
      "https://firebasestorage.googleapis.com/v0/b/ccms-app-builder.appspot.com/o/RUS-AE-001-BACK-TO-SCHOOL-WEB-PROMO-readajusted.jpg?alt=media&token=f1cbd6d6-f416-4b6a-8d55-b60b6a579b9b",
      activated: false,
      applicant_first_name: "Moses Lau",
      applicant_last_name: "Hieng",
      organization_address:
      "Vista Komanwel A, A1-03A-2, Jalan Jalil Perkasa 19, Bukit Jalil",
      organization_city: "Kuala Lumpur",
      organizatiton_demonination: "Catholicism",
      organization_member_size: "201 to 1000",
      organization_state: "Putrajaya",
      organization_zip: "57000",
      role: ""
    },
  ];
  }
  
  ngOnInit(): void {}
 
}