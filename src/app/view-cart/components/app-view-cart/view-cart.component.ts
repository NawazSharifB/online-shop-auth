import { CartService } from '../../../shared/services/cart.service';
import { Subscription } from 'rxjs';
import { Product } from '../../../shared/models/products.model';
import { DataService } from '../../../shared/services/data.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.scss']
})
export class ViewCartComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  dataService$: Subscription;

  constructor(private dataService: DataService,
              private cartService: CartService) { }

  ngOnInit(): void {
    this.dataService$ = this.dataService.cart$.subscribe( items => this.products = items);
  }

  ngOnDestroy(): void {
    this.dataService$.unsubscribe();
  }

  removeItem(product: Product): void {
    this.cartService.removeFromCart(product);
  }

}
