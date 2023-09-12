import { Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-user-request',
  templateUrl: './single-user-request.component.html',
  standalone: true,
  styleUrls: ['./single-user-request.component.scss']
})
export class SingleUserRequestComponent implements OnInit {
  // @Input() userId = "";

  private route = inject(ActivatedRoute);

  constructor() { }

  ngOnInit(): void {
    // console.log(this.userId);
    const id = String(this.route.snapshot.paramMap.get('id'));
    if (id) {
      window.alert(id);
    } else {
      window.alert("No id found");
    }
  }
}
