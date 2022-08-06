import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  hasInvalidForm = false;
  loginForm!: FormGroup;

  private subscription$ = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.authenticationService.redirectIfHasValidLoginInfo();
    this.createLoginForm();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  get emailControl(): FormControl {
    return <FormControl>this.loginForm.get('email');
  }

  get passwordControl(): FormControl {
    return <FormControl>this.loginForm.get('password');
  }

  onLogin(): void {
    if (this.loginForm.invalid) {
      this.hasInvalidForm = true;

      return;
    }

    this.subscription$.add(this.authenticationService
      .loginUser(this.loginForm.value)
      .subscribe(
        () => this.router.navigate(['/all-products']),
        () => this.hasInvalidForm = true,
      ));
  }

  private createLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

}
