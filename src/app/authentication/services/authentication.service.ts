import { LoggedInUserCredential } from './../../shared/interfaces/logged-in-user-credential';
import { LoginUserData } from './../../shared/interfaces/login-user-data';
import { SuccessfulObservableResponse } from './../../shared/interfaces/successful-observable-response';
import { RegisterUserData } from './../../shared/interfaces/register-user-data';
import { StorageService } from './../../shared/services/storage.service';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly loggedInUserDataStorageKey = 'loggedInUserInfo';

  constructor(private storageService: StorageService) { }

  registerUser(registrationData: RegisterUserData): Observable<SuccessfulObservableResponse> {
    return this.storageService.registerUser(registrationData);
  }

  loginUser(loginData: LoginUserData): Observable<LoggedInUserCredential> {
    return this.storageService.loginUser(loginData)
            .pipe(
              tap(loggedInCred => this.storeLoggedInCred(loggedInCred)),
            );
  }

  private storeLoggedInCred(loggedInCred: LoggedInUserCredential): void {
    localStorage.removeItem(this.loggedInUserDataStorageKey);
    localStorage.setItem(this.loggedInUserDataStorageKey, this.getStringifiedData(loggedInCred));
  }

  private getStringifiedData(data: any): string {
    return JSON.stringify(data);
  }

  // private getParsedData(data: string): any {
  //   return JSON.parse(data);
  // }
}
