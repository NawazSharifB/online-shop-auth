import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { DataService } from './shared/services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'online-shop';

  private mediaSub!: Subscription;

  constructor(private cdRef: ChangeDetectorRef,
              private mediaObserver: MediaObserver,
              public dataService: DataService) {}

  ngOnInit(): void {
    // localStorage.clear();
    this.mediaSub = this.mediaObserver.asObservable().subscribe( (change: MediaChange[]) => {
      // console.log(change[0].mqAlias);

      this.dataService.pageSize.next(change[0].mqAlias);
    });

    this.dataService.fetchAllProducts().subscribe();
  }

  ngOnDestroy(): void {
    this.mediaSub?.unsubscribe();
  }
}
