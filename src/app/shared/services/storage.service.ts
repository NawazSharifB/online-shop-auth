import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { SortByOptions } from '../enums/sort-by-options';
import { FailedObservableResponse } from '../interfaces/failed-observable-response';
import { LoggedInUserCredential } from '../interfaces/logged-in-user-credential';
import { LoginUserData } from '../interfaces/login-user-data';
import { PurchasedProductData } from '../interfaces/purchase-product-data';
import { PurchasedUserInfo } from '../interfaces/purchased-user-info';
import { RegisterUserData } from '../interfaces/register-user-data';
import { SuccessfulObservableResponse } from '../interfaces/successful-observable-response';
import { CartProduct } from '../models/cart-product';
import { FailureResponse } from '../models/failure-response';
import { Product } from '../models/products.model';
import { UserPurchaseInfo } from '../models/user-purchase-info';
import { ShopClientService } from './shop-client.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  loggedInUserId$ = new BehaviorSubject<string>('');

  private readonly registeredUserDataStorageKey = 'registeredUserInfo';
  private readonly purchasedDataStorageKey = 'purchasedStorageInfo';
  private readonly allProductsStorageKey = 'allProductsInfo';

  constructor(private shopClientService: ShopClientService) {
    [
      this.registeredUserDataStorageKey,
      this.purchasedDataStorageKey,
      this.allProductsStorageKey
    ].forEach(storageKey => {
      if (!this.hasKeysInLocalStorage(storageKey)) {
        localStorage.setItem(storageKey, this.getStringifiedData([]));
      }
    })
  }

  fetchAllProducts(): Observable<Product[]> {
    return this.getLocallyStoredProducts().length ? of(this.getLocallyStoredProducts()) : this.shopClientService
    .fetchAllProducts()
      .pipe(
        map(products => {
          products.forEach(product => {
            const purchasedUserInfo = this.getPurchasedUserInfo();

            this.calculatedProductStockWithPurchase(purchasedUserInfo, product);
          });

          return products;
        }),
        tap(products => this.storeProductsLocally(products)),
      );
  }

  registerUser(registerData: RegisterUserData): Observable<SuccessfulObservableResponse> {
    return new Observable(observable => {
      if (this.doesUserAlreadyExist(registerData.email)) {
        observable.error(this.getCommonFailedResponse(new FailureResponse('alreadyExists', 'This User already exists', '400')));
      } else {
        registerData.userId = Date.now().toString();
        this.setRegisteredUserInfo(registerData);

        observable.next(this.getCommonSuccessfulResponse(`Successfully Registered user`));
      }

      observable.complete();
    });
  }

  loginUser(loginData: LoginUserData): Observable<LoggedInUserCredential> {
    return new Observable(observer => {
      const userData =
      this.getAllRegisteredUserInfo()
        .find(userInfo => userInfo.email === loginData.email && userInfo.password === loginData.password);

    if (userData) {
      const loggedInUserCred = this.getLoginUserCred(userData);
      observer.next(loggedInUserCred);
    } else {
      observer.error(this.getCommonFailedResponse(new FailureResponse('invalid', 'Invalid email or password', '403')));
    }

    observer.complete();
    });
  }

  sortProducts(sortBy: SortByOptions): Product[] {
    const allProducts = this.getLocallyStoredProducts();

    switch (sortBy) {
      case SortByOptions.LowToHigh:
        allProducts.sort((a, b) => a.price - b.price);
        break;
      case SortByOptions.HighToLow:
        allProducts.sort((a, b) => b.price - a.price);
        break;
    }

    return allProducts;
  }

  addToCart(product: Product, incrementBy = 1): Observable<SuccessfulObservableResponse> {
    return new Observable(observer => {
      if (this.hasUnavailableProduct(product)) {
        observer.error(this.getCommonFailedResponse(<FailureResponse>this.hasUnavailableProduct(product, incrementBy)));
      } else {
        const updatedUserCart = this.incrementLoggedInUserCartItem(product, incrementBy);
        const updatedAllUserPurchaseInfo = this.updateAllUserPurchaseInfo(updatedUserCart);

        this.storeAllUserPurchaseInfo(updatedAllUserPurchaseInfo);
        this.updateAllProductInfo(product._id, -1);
        observer.next(this.getCommonSuccessfulResponse('Successfully added product to cart'));
      }

      observer.complete();
    })
  }

  reduceToCart(product: Product): Observable<SuccessfulObservableResponse> {
    const minimumStockNeeded = 0;

    return new Observable(observer => {
      if (this.hasUnavailableProduct(product, minimumStockNeeded)) {
        observer.error(this.getCommonFailedResponse(<FailureResponse>this.hasUnavailableProduct(product)));
      } else {
        const updatedUserCart = this.decrementLoggedInUserCartItem(product);
        const updatedAllUserPurchaseInfo = this.updateAllUserPurchaseInfo(updatedUserCart);

        this.storeAllUserPurchaseInfo(updatedAllUserPurchaseInfo);
        this.updateAllProductInfo(product._id, 1);
        observer.next(this.getCommonSuccessfulResponse('Successfully reduced product to cart'));
      }

      observer.complete();
    })
  }

  removeFromCart(product: Product): Observable<SuccessfulObservableResponse> {
    const minimumStockNeeded = 0;

    return new Observable(observer => {
      if (this.hasUnavailableProduct(product, minimumStockNeeded)) {
        observer.error(this.getCommonFailedResponse(<FailureResponse>this.hasUnavailableProduct(product)));
      } else {
        const updatedUserCart = this.removedLoggedInUserCartItem(product);
        const updatedAllUserPurchaseInfo = this.updateAllUserPurchaseInfo(updatedUserCart);

        this.storeAllUserPurchaseInfo(updatedAllUserPurchaseInfo);
        this.updateAllProductInfo(product._id, product.inCart);
        observer.next(this.getCommonSuccessfulResponse('Successfully reduced product to cart'));
      }

      observer.complete();
    })
  }

  getLoggedInUserPurchaseInfo(): PurchasedProductData[] {
    return this.getPurchasedUserInfo().find(userInfo => userInfo.userId === this.loggedInUserId$.value)?.purchasedProductData || [];
  }

  getLocallyStoredProducts(): Product[] {
    const stringifiedData = <string>localStorage.getItem(this.allProductsStorageKey);
    return this.getParsedData(stringifiedData);
  }

  private updateAllProductInfo(productId: string, changeBy: number): void {
    const allProducts = this.getLocallyStoredProducts();
    const modifiedProduct = <Product>allProducts.find(product => product._id === productId);

    modifiedProduct.stock += changeBy;

    this.storeProductsLocally(allProducts);
  }

  private hasUnavailableProduct(product: Product, inStockNeed = 1): FailureResponse | null {
    const inStoreProduct = this.getLocallyStoredProducts().find(item => item._id === product._id);

    if (!inStoreProduct) {
      return new FailureResponse('notFound', 'Product not found', '404');
    } else if(inStoreProduct.stock < inStockNeed)  {
      return new FailureResponse('notEnoughStock', 'Stock is limited', '400');
    }

    return null;
  }

  private incrementLoggedInUserCartItem(product: Product, incrementBy: number): PurchasedProductData[] {
    const loggedInUserPurchaseInfo = this.getLoggedInUserPurchaseInfo();

    for(const purchasedProduct of loggedInUserPurchaseInfo) {
      if (purchasedProduct.productId === product._id) {
       purchasedProduct.amount+= incrementBy;

       return loggedInUserPurchaseInfo;
      }
     }

     loggedInUserPurchaseInfo.push(new CartProduct(1, product._id));

     return loggedInUserPurchaseInfo;
  }

  private decrementLoggedInUserCartItem(product: Product): PurchasedProductData[] {
    const minimumProductLength = 0;
    const loggedInUserPurchaseInfo = this.getLoggedInUserPurchaseInfo();

    for(const purchasedProduct of loggedInUserPurchaseInfo) {
      if (purchasedProduct.productId === product._id && purchasedProduct.amount > minimumProductLength) {
       purchasedProduct.amount --;

       return purchasedProduct.amount < 1 ? this.removedLoggedInUserCartItem(product) : loggedInUserPurchaseInfo;
      }
     }

     return loggedInUserPurchaseInfo;
  }

  private removedLoggedInUserCartItem(product: Product): PurchasedProductData[] {
    const loggedInUserPurchaseInfo = this.getLoggedInUserPurchaseInfo();

    for(const purchasedProduct of loggedInUserPurchaseInfo) {
      if (purchasedProduct.productId === product._id) {
        const indexOfProduct = loggedInUserPurchaseInfo.indexOf(purchasedProduct);

        loggedInUserPurchaseInfo.splice(indexOfProduct, 1);

       return loggedInUserPurchaseInfo;
      }
     }

     return loggedInUserPurchaseInfo;
  }

  private updateAllUserPurchaseInfo(purchaseInfo: PurchasedProductData[]): PurchasedUserInfo[] {
    const allUserPurchaseInfo = this.getPurchasedUserInfo();
    for (const userPurchaseInfo of allUserPurchaseInfo) {
      if (userPurchaseInfo.userId === this.loggedInUserId$.value) {
        userPurchaseInfo.purchasedProductData = purchaseInfo;

        return allUserPurchaseInfo;
      }
    }

    allUserPurchaseInfo.push(new UserPurchaseInfo(this.loggedInUserId$.value, purchaseInfo))

    return allUserPurchaseInfo;
  }

  private storeAllUserPurchaseInfo(purchaseInfo: PurchasedUserInfo[]): void {
    const stringifiedData = this.getStringifiedData(purchaseInfo);

    localStorage.setItem(this.purchasedDataStorageKey, stringifiedData);
  }

  private storeProductsLocally(products: Product[]): void {
    const stringifiedData = this.getStringifiedData(products);

    localStorage.setItem(this.allProductsStorageKey, stringifiedData);
  }

  private getPurchasedUserInfo(): PurchasedUserInfo[] {
    const stringifiedInfo = <string>localStorage.getItem(this.purchasedDataStorageKey) || JSON.stringify([]);

    return this.getParsedData(stringifiedInfo);
  }

  private getLoginUserCred(userData: RegisterUserData): LoggedInUserCredential {
    const fiveMinutesInMillisecond = 60 * 5 * 1000;
    const nextFiveMinuteTime = Date.now() + fiveMinutesInMillisecond;
    const loggedInUserCred: LoggedInUserCredential = {
      userId: <string>userData.userId,
      expireIn: nextFiveMinuteTime,
    }

    return loggedInUserCred;
  }

  private doesUserAlreadyExist(email: string): boolean {
    return !!this.getAllRegisteredUserInfo().find(userInfo => userInfo.email === email);
  }

  private getAllRegisteredUserInfo(): RegisterUserData[] {
    const stringifiedData = <string>localStorage.getItem(this.registeredUserDataStorageKey);

    return this.getParsedData(stringifiedData);
  }

  private setRegisteredUserInfo(registeredUserInfo: RegisterUserData): void {
    const allRegisteredUserInfo = this.getAllRegisteredUserInfo();

    allRegisteredUserInfo.push(registeredUserInfo);
    localStorage.setItem(this.registeredUserDataStorageKey, this.getStringifiedData(allRegisteredUserInfo));
  }

  private getStringifiedData(data: any): string {
    return JSON.stringify(data);
  }

  private getParsedData(data: string): any {
    return JSON.parse(data);
  }

  private getCommonSuccessfulResponse(message: string): SuccessfulObservableResponse {
    return {
      isSuccess: true,
      message,
    };
  }

  private getCommonFailedResponse(responseData: FailureResponse): FailedObservableResponse {
    return {
      [responseData.key]: responseData.message,
      status: responseData.errorStatus,
    };
  }

  private calculatedProductStockWithPurchase(purchasedUserInfo: PurchasedUserInfo[], product: Product): void {
    purchasedUserInfo.forEach(purchasedProducts => {
      for (const purchasedProduct of purchasedProducts.purchasedProductData) {
        if (purchasedProduct.productId === product._id) {
          product.stock -= purchasedProduct.amount;
          break;
        }
      }
    });
  }

  private hasKeysInLocalStorage(keys: string): boolean {
    return !!localStorage.getItem(keys);
  }
}
