import { PurchasedProductData } from "../interfaces/purchase-product-data";

export class CartProduct implements PurchasedProductData {
  constructor(public amount: number, public productId: string) {}
}
