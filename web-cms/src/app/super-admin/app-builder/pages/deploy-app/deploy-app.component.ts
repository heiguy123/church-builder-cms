import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-deploy-app',
  templateUrl: './deploy-app.component.html',
  styleUrls: ['./deploy-app.component.scss'],
  standalone: true,
})
export class DeployAppComponent implements OnInit {

  ngOnInit(): void {
  }

  constructor(private http: HttpClient) {}

  deployApp() {
    
  }
}