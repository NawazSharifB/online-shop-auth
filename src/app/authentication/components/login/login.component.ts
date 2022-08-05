import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  get emailControl(): FormControl {
    return <FormControl>this.loginForm.get('email');
  }

  get passwordControl(): FormControl {
    return <FormControl>this.loginForm.get('password');
  }

  onLogin(): void {
    this.authenticationService
      .loginUser(this.loginForm.value)
      .subscribe(data => {
        console.log(data);
      });
  }

  private createLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

}
