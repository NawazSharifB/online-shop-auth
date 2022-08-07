import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Product } from '../../../shared/models/products.model';
import { CartService } from '../../../shared/services/cart.service';
import { DataService } from '../../../shared/services/data.service';



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['Cancel', 'Picture', 'Title', 'Price', 'Edit', 'SubTotal'];

  private subscription$ = new Subscription();

  constructor(
    public route: ActivatedRoute,
    private dataService: DataService,
    private cartService: CartService,
  ) {}

  ngOnInit(): void {
    if (!this.dataService.products$.value.length) {
      this.subscription$.add(this.dataService.fetchAllProducts().subscribe());
    }
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  get cartItems(): Observable<Product[]> {
    return this.dataService.userCartInfo$.asObservable();
  }

  removeItem(element: Product): void {
    this.cartService.removeFromCart(element).subscribe();
  }
}
