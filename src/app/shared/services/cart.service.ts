import { Product } from '../models/products.model';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  localStorageLocation = 'cartItems';

  deletedItem: any = {};

  constructor(private dataService: DataService, private snackBar: MatSnackBar) { }

  addToCart(product: Product): void {
    let localStorageItem: Product[] | null = JSON.parse(localStorage.getItem(this.localStorageLocation));

    let mainProducts: Product[];
    this.dataService.products$.subscribe( data => mainProducts = data);
    const indexInMainProduct = mainProducts.indexOf(product);

    if (localStorageItem) {

      let found = false;

      for (const lsi of localStorageItem) {
        if (lsi._id === product._id) {
          found = true;
          const indexOfLSI = localStorageItem.indexOf(lsi);
          product.inCart++;
          product.stock--;

          localStorageItem.splice(indexOfLSI, 1, product);
          this.dataService.cart$.next(localStorageItem);
          localStorage.setItem(this.localStorageLocation, JSON.stringify(localStorageItem));

          mainProducts.splice(indexInMainProduct, 1, product);
          this.dataService.products$.next(mainProducts);
        }
      }



      if (!found) {
        product.inCart++;
        product.stock--;


        localStorageItem.push(product);
        this.dataService.cart$.next(localStorageItem);
        localStorage.setItem(this.localStorageLocation, JSON.stringify(localStorageItem));

        mainProducts.splice(indexInMainProduct, 1, product);
        this.dataService.products$.next(mainProducts);
      }


    } else {
      // localStorage doesn't exists or first time to add product to cart

      product.stock--;
      product.inCart++;

      mainProducts.splice(indexInMainProduct, 1, product);
      this.dataService.products$.next(mainProducts);

      localStorageItem = [];
      localStorageItem.push(product);
      this.dataService.cart$.next(localStorageItem);
      localStorage.setItem(this.localStorageLocation, JSON.stringify(localStorageItem));
    }
  }




  reduceToCart(product: Product): void {
    const localStorageItem: Product[] | null = JSON.parse(localStorage.getItem(this.localStorageLocation));

    let mainProducts: Product[];
    this.dataService.products$.subscribe( data => mainProducts = data);
    const indexInMainProduct = mainProducts.indexOf(product);
    for (const lsi of localStorageItem) {
      if (product._id === lsi._id) {
        const indexInLSI = localStorageItem.indexOf(lsi);

        product.inCart--;
        product.stock++;

        if (product.inCart === 0) {
          localStorageItem.splice(indexInLSI, 1);
        } else {
          localStorageItem.splice(indexInLSI, 1, product);
        }
        this.dataService.cart$.next(localStorageItem);
        localStorage.setItem(this.localStorageLocation, JSON.stringify(localStorageItem));

        mainProducts.splice(indexInMainProduct, 1, product);
        this.dataService.products$.next(mainProducts);
      }
    }

  }



  removeFromCart(product: Product): void {
    const localStorageItem: Product[] | null = JSON.parse(localStorage.getItem(this.localStorageLocation));

    let mainProducts: Product[];
    this.dataService.products$.subscribe( data => mainProducts = data);

    this.deletedItem.item = Object.assign({}, product);
    this.deletedItem.mainProducts = mainProducts;
    this.deletedItem.localStorageItem = localStorageItem;


    for (const mpi of mainProducts) {
      if (mpi._id === product._id) {
        const index = mainProducts.indexOf(mpi);

        this.deletedItem.mpiIndex = index;

        product.stock += product.inCart;
        product.inCart = 0;

        mainProducts.splice(index, 1, product);
        this.dataService.products$.next(mainProducts);
      }
    }

    for (const lsi of localStorageItem) {
      if (lsi._id === product._id) {
        const index = localStorageItem.indexOf(lsi);

        this.deletedItem.lsiIndex = index;
        localStorageItem.splice(index, 1);
        this.dataService.cart$.next(localStorageItem);
        localStorage.setItem(this.localStorageLocation, JSON.stringify(localStorageItem));

      }
    }

    this.openSnackBar();


  }


  private openSnackBar(): void {
    const sRef = this.snackBar.open('An Item Is removed From Cart', 'Undo', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3000
    });

    sRef.onAction().subscribe(() => {

      const productsMP: Product[] = this.deletedItem.mainProducts;
      const productsCP: Product[] = this.deletedItem.localStorageItem;

      productsMP[this.deletedItem.mpiIndex] = this.deletedItem.item;
      productsCP.push(this.deletedItem.item);

      this.dataService.cart$.next(productsCP);
      this.dataService.products$.next(productsMP);

      localStorage.setItem(this.localStorageLocation, JSON.stringify(productsCP));
    });


  }


}
