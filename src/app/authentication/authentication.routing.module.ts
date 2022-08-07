import { AvailableRoutes } from './../shared/enums/available-routes';
import { Route, RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';

const routes: Route[] = [
  { path: AvailableRoutes.Register, component: RegistrationComponent },
    { path: AvailableRoutes.Login, component: LoginComponent },
    { path: '', redirectTo: `/${AvailableRoutes.Login}` },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
