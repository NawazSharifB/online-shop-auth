import { Route, RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';

const routes: Route[] = [
  { path: 'register', component: RegistrationComponent },
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
