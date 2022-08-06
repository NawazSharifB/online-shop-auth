import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AllProductsComponent } from './components/app-all-products/all-products.component';
import { SortingComponent } from './components/app-sorting/sorting.component';
import { NgMaterialModule } from '../common-modules/ng-material.module';
import { ProductComponent } from './components/app-product/product.component';
import { SharedModule } from '../shared/shared.module';
import { ViewCartModule } from '../view-cart/view-cart.module';

@NgModule({
  declarations: [
    AllProductsComponent,
    SortingComponent,
    ProductComponent,
  ],
  imports: [
    NgMaterialModule,
    SharedModule,
    ViewCartModule,
    RouterModule.forChild([
      {path: '', component: AllProductsComponent}
    ]),
  ],
})
export class ProductsModule { }
