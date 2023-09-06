import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public loginForm = this.formBuilder.group({
    email : [''],
    password : ['']
  });

  constructor (
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  onSubmit() : void {
    console.log(this.loginForm.value);
  }

  goToRegister() : void {
    this.router.navigate(['/register']);
  }

  goToForgot() : void {
    this.router.navigate(['/forgot']);
  }
}
