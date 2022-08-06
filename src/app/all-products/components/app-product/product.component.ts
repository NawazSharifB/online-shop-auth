import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AvailableRoutes } from '../../../shared/enums/available-routes';
import { Product } from '../../../shared/models/products.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  @Input() product!: Product;

  constructor(private router: Router) {}

  goDetails(): void {
    this.router.navigate([`/${AvailableRoutes.Product}/`, this.product._id]);
  }


}
