import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../../../shared/models/products.model';
import { DataService } from '../../../shared/services/data.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];

  private subscription: Subscription = new Subscription();

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.subscription.add(this.dataService.fetchAllProducts().subscribe());

    this.subscription.add(this.dataService.products$.subscribe( products => {
      this.products = products;
    }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
