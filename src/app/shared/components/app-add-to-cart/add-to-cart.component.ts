import { CartService } from '../../../shared/services/cart.service';
import { Product } from '../../../shared/models/products.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent {
  @Input()product!: Product;

  constructor(private cartService: CartService) { }

  reduceItem(): void {
    this.cartService.reduceToCart(this.product);
  }

  addItem(): void {
    this.cartService.addToCart(this.product);
  }

}
