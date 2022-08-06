import { PurchasedProductData } from "./purchase-product-data";

export interface PurchasedUserInfo {
  userId: string;
  purchasedProductData: PurchasedProductData[];
}
