import { Subscription } from 'rxjs';
import { CartService } from '../../../shared/services/cart.service';
import { DataService } from '../../../shared/services/data.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../shared/models/products.model';



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})

export class CartComponent implements OnInit, OnDestroy {

  dataService$: Subscription;
  showTable = true;

  displayedColumns: string[] = ['Cancel', 'Picture', 'Title', 'Price', 'Edit', 'SubTotal'];

  constructor(public dataService: DataService,
              public route: ActivatedRoute,
              private cartService: CartService) { }

  ngOnInit(): void {

    this.dataService$ = this.dataService.cart$.subscribe(() => {
      this.showTable = false;
      setTimeout(() => this.showTable = true, 50);
    });
  }

  ngOnDestroy(): void {
    this.dataService$.unsubscribe();
  }

  removeItem(element: Product): void {
    this.cartService.removeFromCart(element);
  }

}
