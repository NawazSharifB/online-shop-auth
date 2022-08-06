import { Product } from '../../../shared/models/products.model';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() product!: Product;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goDetails(): void {
    this.router.navigate(['/product/', this.product._id]);
  }


}
