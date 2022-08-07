import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../../../shared/services/data.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnDestroy {
  private subscription$ = new Subscription();

  constructor(private dataService: DataService) {}

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  totalCost(): number {
    let total = 0;

    this.subscription$.add(
      this.dataService.userCartInfo$.subscribe( items => {
        items.forEach( item => {
          total += item.inCart * item.price;
        });
      }),
    );

    return total;
  }

}
