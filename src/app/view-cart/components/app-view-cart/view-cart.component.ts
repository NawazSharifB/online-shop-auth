import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../../../shared/models/products.model';
import { CartService } from '../../../shared/services/cart.service';
import { DataService } from '../../../shared/services/data.service';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.scss']
})
export class ViewCartComponent implements OnInit, OnDestroy {
  products: Product[] = [];

  private subscription$ = new Subscription();

  constructor(
    private dataService: DataService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.subscription$.add(
      this.dataService.userCartInfo$.subscribe( items => this.products = items),
    );
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  removeItem(product: Product): void {
    this.cartService.removeFromCart(product).subscribe();
  }
}
