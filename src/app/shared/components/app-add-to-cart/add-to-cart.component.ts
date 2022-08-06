import { Subscription } from 'rxjs';
import { DataService } from './../../services/data.service';
import { CartService } from '../../../shared/services/cart.service';
import { Product } from '../../../shared/models/products.model';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent implements OnInit, OnDestroy {
  @Input() product!: Product;
  @Input() inCartProduct!: Product;

  private subscription$ = new Subscription();

  constructor(private cartService: CartService, private dataService: DataService) { }

  ngOnInit(): void {
    this.inCartProduct = this.product;
    this.subscription$.add(this.dataService.userCartInfo$.subscribe(cartItems => {
      const productInCart = cartItems.find(item => item._id === this.product._id);

      if (productInCart) {
        this.inCartProduct = productInCart;
      }
    }));
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  reduceItem(): void {
    this.cartService.reduceToCart(this.product).subscribe();
  }

  addItem(): void {
    this.cartService.addToCart(this.product).subscribe();
  }

}
