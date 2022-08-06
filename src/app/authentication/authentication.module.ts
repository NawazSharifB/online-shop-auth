import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { NgMaterialModule } from "../common-modules/ng-material.module";
import { AuthenticationRoutingModule } from "./authentication.routing.module";
import { LoginComponent } from "./components/login/login.component";
import { RegistrationComponent } from "./components/registration/registration.component";

@NgModule({
  declarations: [RegistrationComponent, LoginComponent],
  imports: [CommonModule, ReactiveFormsModule, NgMaterialModule, AuthenticationRoutingModule],
})
export class AuthenticationModule {}
