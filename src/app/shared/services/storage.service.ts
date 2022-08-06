import { ShopClientService } from './shop-client.service';
import { Injectable } from '@angular/core';
import { Observer, Observable, observable, map } from 'rxjs';
import { FailedObservableResponse } from '../interfaces/failed-observable-response';
import { LoggedInUserCredential } from '../interfaces/logged-in-user-credential';
import { LoginUserData } from '../interfaces/login-user-data';
import { RegisterUserData } from '../interfaces/register-user-data';
import { SuccessfulObservableResponse } from '../interfaces/successful-observable-response';
import { Product } from '../models/products.model';
import { PurchasedUserInfo } from '../interfaces/purchased-user-info';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly registeredUserDataStorageKey = 'registeredUserInfo';
  private readonly purchasedDataStorageKey = 'purchasedStorageInfo';

  constructor(private shopClientService: ShopClientService) {
    if (this.hasRegisteredUserInfoKey()) {
      localStorage.setItem(this.registeredUserDataStorageKey, this.getStringifiedData([]));
    }

    if (!this.hasPurchasedUserInfoKey()) {
      localStorage.setItem(this.registeredUserDataStorageKey, this.getStringifiedData([]));
    }
  }

  fetchAllProducts(): Observable<Product[]> {
    return this.shopClientService
      .fetchAllProducts()
      .pipe(
        map(products => {
          products.forEach(product => {
            const purchasedUserInfo = this.getPurchasedUserInfo();

            this.calculatedProductStockWithPurchase(purchasedUserInfo, product);
          });

          return products;
        })
      );
  }


  registerUser(registerData: RegisterUserData): Observable<SuccessfulObservableResponse> {
    return new Observable(observable => {
      if (this.doesUserAlreadyExist(registerData.email)) {
        observable.error(this.getCommonFailedResponse('alreadyExists', 'This User already exists'));
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
      const userData = this.getAllRegisteredUserInfo()
                        .find(userInfo => userInfo.email === loginData.email && userInfo.password === loginData.password);

    if (userData) {
      const loggedInUserCred = this.getLoginUserCred(userData);
      observer.next(loggedInUserCred);
    } else {
      observer.error(this.getCommonFailedResponse('invalid', 'Invalid email or password'));
    }

    observer.complete();
    });

  }

  private getPurchasedUserInfo(): PurchasedUserInfo[] {
    const stringifiedInfo = <string>localStorage.getItem(this.purchasedDataStorageKey);

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

  private hasRegisteredUserInfoKey(): boolean {
    return !!localStorage.getItem(this.registeredUserDataStorageKey);
  }

  private hasPurchasedUserInfoKey(): boolean {
    return !!localStorage.getItem(this.purchasedDataStorageKey);
  }

  private setRegisteredUserInfo(registeredUserInfo: Omit<RegisterUserData, 'confirmPassword'>): void {
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

  private getCommonFailedResponse(key: string, message: string): FailedObservableResponse {
    return {
      [key]: message,
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
}
