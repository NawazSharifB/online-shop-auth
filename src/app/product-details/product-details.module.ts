import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgMaterialModule } from '../common-modules/ng-material.module';
import { RouteParam } from '../shared/enums/route-params';
import { SharedModule } from '../shared/shared.module';
import { ViewCartModule } from '../view-cart/view-cart.module';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

@NgModule({
  declarations: [
    ProductDetailsComponent
  ],
  imports: [
    NgMaterialModule,
    ViewCartModule,
    SharedModule,
    CommonModule,
    RouterModule.forChild([
      {path: `:${RouteParam.ProductDetailId}`, component: ProductDetailsComponent}
    ]),
  ],
})
export class ProductDetailsModule {}
