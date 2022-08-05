import { AuthenticationService } from './../../services/authentication.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { confirmPasswordMatch } from '../../form-validators/confirm-password.validator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {
  isRegistrationFormInvalid = false;
  registrationForm!: FormGroup;

  private subscription = new Subscription();

  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
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

  get confirmPasswordControl(): FormControl {
    return <FormControl>this.registrationForm.get('confirmPassword');
  }

  register(): void {
    if (this.registrationForm.invalid) {
      this.isRegistrationFormInvalid = true;
      return;
    }

    this.subscription.add(this.authenticationService
    .registerUser(this.registrationForm.value)
    .subscribe(data => {
      console.log(data);
    }));
  }

  private createRegistrationForm(): void {
    this.registrationForm = this.formBuilder.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(4)]],
      confirmPassword: [null, [Validators.required]],
    });
  }

}
