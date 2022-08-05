import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NgMaterialModule } from "../common-modules/ng-material.module";
import { AuthenticationRoutingModule } from "./authentication.routing.module";
import { LoginComponent } from "./components/login/login.component";
import { RegistrationComponent } from "./components/registration/registration.component";

@NgModule({
  declarations: [RegistrationComponent, LoginComponent],
  imports: [NgMaterialModule, AuthenticationRoutingModule],
})
export class AuthenticationModule {}
