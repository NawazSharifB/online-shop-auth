import { Subscription } from 'rxjs';
import { DataService } from '../../../shared/services/data.service';
import { Product } from '../../../shared/models/products.model';
import {  Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  pSub: Subscription;

  sortBy = 'None';


  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.pSub = this.dataService.products$.subscribe( products => {
      this.products = products;
    });
  }

  ngOnDestroy(): void {
    this.pSub.unsubscribe();
  }

  sortProducts(by: string): void {
    this.sortBy = by;
    this.dataService.sortBy(by);
  }

  // loadMoreProducts(): void {
  //   this.dataService.sendProducts();
  // }

}
