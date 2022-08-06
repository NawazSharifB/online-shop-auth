import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication/services/authentication.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subscription, Observable } from 'rxjs';
import { DataService } from './shared/services/data.service';
import { DialogService } from './shared/services/dialog.service';
import { mergeMap } from 'rxjs/operators';
import { from } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'online-shop';

  private subscription$ = new Subscription();

  constructor(
    private mediaObserver: MediaObserver,
    public dataService: DataService,
    private dialogService: DialogService,
    private authenticationService: AuthenticationService,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.authenticationService.storeLoginUserInfo();
    this.subscription$.add(this.mediaObserver.asObservable().subscribe( (change: MediaChange[]) => {
      this.dataService.pageSize.next(change[0].mqAlias);
    }));
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  get isDataLoading(): Observable<boolean> {
    return this.dialogService.isLoading$.asObservable();
  }
}
