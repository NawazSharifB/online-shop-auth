import { PurchasedProductData } from '../interfaces/purchase-product-data';
import { PurchasedUserInfo } from '../interfaces/purchased-user-info';

export class UserPurchaseInfo implements PurchasedUserInfo {
  constructor(public userId: string, public purchasedProductData: PurchasedProductData[]) {}
}
