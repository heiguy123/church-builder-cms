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
  
  

  // variable - default false
  show: boolean = false;

  constructor (
    private router: Router,
  ) { 
    this.show = false;
  }

  onSubmit() {
    this.lastPage = true;
    this.form.reset();
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

  changePage(isNextPage: boolean) {

    if (isNextPage) {
      this.currentStep++;
    } else {
      this.currentStep--;
    }
  }
}