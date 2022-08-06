import { AuthenticationService } from './../../services/authentication.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {
  registrationForm!: FormGroup;
  hasInvalidForm = false;

  private subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.authenticationService.redirectIfHasValidLoginInfo();
    this.createRegistrationForm();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get firstNameControl(): FormControl {
    return <FormControl>this.registrationForm.get('firstName');
  }

  get lastNameControl(): FormControl {
    return <FormControl>this.registrationForm.get('lastName');
  }

  get emailControl(): FormControl {
    return <FormControl>this.registrationForm.get('email');
  }

  get passwordControl(): FormControl {
    return <FormControl>this.registrationForm.get('password');
  }

  register(): void {
    if (this.registrationForm.invalid) {
      this.hasInvalidForm = true;
      return;
    }

    this.subscription.add(this.authenticationService
    .registerUser(this.registrationForm.value)
    .subscribe(() => {
      this.router.navigate(['/auth/login']);
    },
    () => {
      this.hasInvalidForm = true;
    }));
  }

  private createRegistrationForm(): void {
    this.registrationForm = this.formBuilder.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(4)]],
    });
  }

}
