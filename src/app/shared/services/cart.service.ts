import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { SuccessfulObservableResponse } from '../interfaces/successful-observable-response';
import { Product } from '../models/products.model';
import { DataService } from './data.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private dataService: DataService, private storageService: StorageService) { }

  addToCart(product: Product): Observable<SuccessfulObservableResponse> {
    return this.storageService
      .addToCart(product)
      .pipe(
        tap(() => {
          this.dataService.populateCartItems();
          this.updatedProductInfo();
        }),
      );
  }

  reduceToCart(product: Product): Observable<SuccessfulObservableResponse> {
    return this.storageService
      .reduceToCart(product)
      .pipe(
        tap(() => {
          this.dataService.populateCartItems();
          this.updatedProductInfo();
        }),
      );
  }


  removeFromCart(product: Product): Observable<SuccessfulObservableResponse> {
    return this.storageService
      .removeFromCart(product)
      .pipe(
        tap(() => {
          this.dataService.populateCartItems();
          this.updatedProductInfo();

        }),
      );
  }

  private updatedProductInfo(): void {
    const allProductInfo = this.storageService.sortProducts(this.dataService.sortBy$.value.key);

    this.dataService.products$.next(allProductInfo);
  }
}
