import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthenticationService } from '../../authentication/services/authentication.service';
import { AvailableRoutes } from '../../shared/enums/available-routes';
import { DataService } from '../../shared/services/data.service';
import { DialogService } from '../../shared/services/dialog.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {
  totalCartItem = 0;
  availableRoutes = AvailableRoutes;

  private subscription$ = new Subscription();

  constructor(
    private dialogService: DialogService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private dataService: DataService,
  ) {}

  ngOnInit(): void {
    this.subscription$.add(
      this.dataService.userCartInfo$.subscribe(products => {
      this.totalCartItem = 0;
      products.forEach( product => {
        this.totalCartItem += product.inCart;
      });
    }));
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  get isUserLoggedIn(): boolean {
    return this.authenticationService.isUserLoggedIn();
  }

  get isDataLoading(): Observable<boolean> {
    return this.dialogService.isLoading$.asObservable();
  }

  logoutUser(): void {
    this.authenticationService.onLogout();
    this.router.navigate([`${AvailableRoutes.AuthLogin}`]);
  }

}
