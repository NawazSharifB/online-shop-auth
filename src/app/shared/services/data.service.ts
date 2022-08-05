// import { CartService } from './cart.service';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from '../models/products.model';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { ShopClientService } from './shop-client.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  productInPage = 0;
  loading = new BehaviorSubject<boolean>(false);

  productsArr: Product[] = [];
  productsArrReplica: Product[] = [];
  products$ = new BehaviorSubject<Product[]>([]);

  cartArr: Product[] = [];
  cart$ = new BehaviorSubject<Product[]>([]);

  pageSize = new BehaviorSubject<string>('');


  constructor(private http: HttpClient, private router: Router, private shopClient: ShopClientService) { }

  fetchData(): void {
    this.loading.next(true);
    this.shopClient.fetchAllProducts().subscribe( data => {
      console.log(data);
      data.forEach(d => {
        this.productsArr.push( new Product(d._id, d.title, d.description, d.picture, d.price, d.stock, 0));
      });

      this.matchLocalStorage();
      this.products$.next(this.productsArr);
      // this.sendProducts();
      this.productsArrReplica = Object.assign([], this.productsArr);

      setTimeout(() => {
        this.loading.next(false);
      }, 3000);
    }, error => {
      console.log(error);
      this.router.navigate(['/server-error']);

      setTimeout(() => {
        this.loading.next(false);
      }, 3000);
    });

    this.cart$.next(JSON.parse(localStorage.getItem('cartItems')) ? JSON.parse(localStorage.getItem('cartItems')) : []);
  }


  matchLocalStorage(): void {
    const inCart: Product[]  | null = JSON.parse(localStorage.getItem('cartItems'));
    // console.log(typeof inCart);
    // console.log(inCart.length);
    // console.log(this.productsArr.length);
    if (inCart && inCart.length && this.productsArr.length) {
      inCart.forEach( item => {
        for (let i = 0; i < this.productsArr.length; i++) {
          // console.log('looping');
          // console.log(item._id);
          // console.log(this.productsArr[i]._id);
          if (item._id === this.productsArr[i]._id) {
            this.productsArr.splice(i, 1, item);
            // console.log('data matched');
            break;
          }
        }
      });
    }
  }


  sortBy(by: string): void {
    let arr: Product[];

    switch (by) {
      case 'None' :
      arr = this.productsArrReplica;
      this.products$.next(arr);
      // this.sendProducts();
      break;

      case 'High to Low':
      arr = this.productsArr.sort((a, b) => b.price - a.price);
      this.products$.next(arr);
      // this.sendProducts();
      break;

      case 'Low to High':
      arr = this.productsArr.sort((a, b) => a.price - b.price);
      this.products$.next(arr);
      // this.sendProducts();
      break;
    }
  }

  // sendProducts(): void {
  //   let pageSize = 'lg';
  //   this.pageSize.subscribe(size => pageSize = size);

  //   switch (pageSize) {
  //     case 'xs': this.fixProductNumberInPage(1); break;
  //     case 'sm': this.fixProductNumberInPage(2); break;
  //     case 'md': this.fixProductNumberInPage(3); break;
  //     case 'lg': this.fixProductNumberInPage(3); break;
  //     case 'xl': this.fixProductNumberInPage(4); break;
  //   }
  // }

  // private fixProductNumberInPage(n: number): void {
  //   let pArr: Product[] = [];
  //   this.products$.subscribe(items => pArr = items);

  //   if (this.productInPage === 0) {
  //     n = 10 - (10 % n) + n;
  //     pArr = [...pArr, ...this.productsArr.slice(0, n)];
  //     console.log('initial number of products in page', pArr.length);
  //     console.log('products in pArr', pArr);
  //     this.productInPage = pArr.length;
  //     console.log('after adding new products', pArr.length);
  //   } else {
  //     let newProductInPage = (this.productInPage + 10);
  //     newProductInPage = newProductInPage - (newProductInPage % n) + n;
  //     pArr = [...pArr, ...this.productsArr.slice(this.productInPage, newProductInPage)];
  //     console.log('after number of products in page', pArr.length);
  //     console.log('products in pArr', pArr);
  //     this.productInPage = pArr.length;
  //     console.log('after adding new products', pArr.length);
  //   }

  //   this.products$.next(pArr);

  // }



}
