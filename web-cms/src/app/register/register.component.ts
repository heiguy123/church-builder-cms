import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MultiStepFormComponent } from './multi-step-form/multi-step-form.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [MultiStepFormComponent],
  standalone: true,
})
export class RegisterComponent {

  loginForm = this.formBuilder.group({
    email : [''],
    password : ['']
  });

  // variable - default false
  show: boolean = false;

  constructor (
    private formBuilder: FormBuilder,
    private router: Router,
  ) { 
    this.show = false;
  }

  onSubmit() : void {
    console.log(this.loginForm.value);
  }

  goToLogin() : void {
    this.router.navigate(['/login']);
  }

  goToForgot() : void {
    this.router.navigate(['/forgot']);
  }

  // click event function toggle
  showPassword() {
    this.show = !this.show;
  }
}