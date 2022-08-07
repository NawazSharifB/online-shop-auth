import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { DataService } from '../../shared/services/data.service';
import { AvailableRoutes } from './../../shared/enums/available-routes';
import { LoggedInUserCredential } from './../../shared/interfaces/logged-in-user-credential';
import { LoginUserData } from './../../shared/interfaces/login-user-data';
import { RegisterUserData } from './../../shared/interfaces/register-user-data';
import { SuccessfulObservableResponse } from './../../shared/interfaces/successful-observable-response';
import { StorageService } from './../../shared/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly loggedInUserDataStorageKey = 'loggedInUserInfo';

  constructor(
    private storageService: StorageService,
    private router: Router,
    private dataService: DataService
  ) {}

  private get loggedInUserCred(): LoggedInUserCredential  | null {
    const stringifiedData = localStorage.getItem(this.loggedInUserDataStorageKey);

    if (stringifiedData) {
      return this.getParsedData(stringifiedData);
    }

    return null;

  }

  registerUser(registrationData: RegisterUserData): Observable<SuccessfulObservableResponse> {
    return this.storageService.registerUser(registrationData);
  }

  loginUser(loginData: LoginUserData): Observable<LoggedInUserCredential> {
    return this.storageService.loginUser(loginData).pipe(
      tap(loggedInCred => this.storeLoggedInCred(loggedInCred)),
      tap(loggedInCred => this.storageService.loggedInUserId$.next(loggedInCred.userId))
    );
  }

  redirectIfHasValidLoginInfo(): void {
    if (this.isUserLoggedIn()) {
      this.router.navigate([`/${AvailableRoutes.AllProducts}`]);
    }
  }

  isUserLoggedIn(): boolean {
    return !!this.loggedInUserCred;
  }

  isLoginInfoValid(): boolean {
    return (<LoggedInUserCredential>this.loggedInUserCred).expireIn > Date.now();
  }

  storeLoginUserInfo(): void {
    if (this.isUserLoggedIn()) {
      this.storageService.loggedInUserId$.next((<LoggedInUserCredential>this.loggedInUserCred).userId);
    }
  }

  onLogout(): void {
    localStorage.removeItem(this.loggedInUserDataStorageKey);
    this.storageService.loggedInUserId$.next('');
    this.dataService.clearAllData();
  }

  private storeLoggedInCred(loggedInCred: LoggedInUserCredential): void {
    localStorage.removeItem(this.loggedInUserDataStorageKey);
    localStorage.setItem(this.loggedInUserDataStorageKey, this.getStringifiedData(loggedInCred));
  }

  private getStringifiedData(data: any): string {
    return JSON.stringify(data);
  }

  private getParsedData(data: string): any {
    return JSON.parse(data);
  }
}
