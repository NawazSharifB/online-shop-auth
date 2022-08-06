import { DialogService } from './dialog.service';
import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';

import { Product } from '../models/products.model';
import { BehaviorSubject, catchError, finalize, Observable, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ShopClientService } from './shop-client.service';
import { SortByOptions } from '../enums/sort-by-options';
import { PurchasedProductData } from '../interfaces/purchase-product-data';
import { SORT_OPTIONS } from '../constants/sort-options';
import { DropdownOptions } from '../interfaces/dropdown-options';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  products$ = new BehaviorSubject<Product[]>([]);
  userCartInfo$ = new BehaviorSubject<Product[]>([]);
  pageSize = new BehaviorSubject<string>('');
  sortBy$ = new BehaviorSubject<DropdownOptions<SortByOptions>>(SORT_OPTIONS[0]);

  constructor(private router: Router, private storageService: StorageService, private dialogService: DialogService) {}

  fetchAllProducts(): Observable<Product[]> {
    this.dialogService.isLoading$.next(true);

    return this.storageService
      .fetchAllProducts()
      .pipe(
        tap(products => this.products$.next(products)),
        tap(() => this.populateCartItems()),
        finalize(() => this.dialogService.isLoading$.next(false)),
        catchError(error => {
          this.router.navigate(['/server-error']);
          return throwError(() => error);
        }),
      );
  }


  sortBy(sortBy: DropdownOptions<SortByOptions>): void {
    this.sortBy$.next(sortBy);
    const products = this.storageService.sortProducts(sortBy.key);

    this.products$.next(products);
  }

  populateCartItems(): void {
    const userPurchaseInfo = this.storageService.getLoggedInUserPurchaseInfo();
    const allProductInfo = this.products$.value;
    const cartItems = allProductInfo
      .filter(product => userPurchaseInfo.find(purchasedProduct => purchasedProduct.productId === product._id))
      .map(product => {
        product.inCart = (<PurchasedProductData>userPurchaseInfo.find(purchasedProduct => purchasedProduct.productId === product._id)).amount;

        return product;
      } );

      this.userCartInfo$.next(cartItems);
  }

  clearAllData(): void {
    this.products$.next([]);
    this.userCartInfo$.next([]);
  }
}
