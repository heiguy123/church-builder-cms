import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-user-request',
  templateUrl: './single-user-request.component.html',
  standalone: true,
  styleUrls: ['./single-user-request.component.scss']
})
export class SingleUserRequestComponent implements OnInit {
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Use the correct parameter name
    if (id) {
      window.alert(id);
    } else {
      window.alert("No id found");
    }
  }
}