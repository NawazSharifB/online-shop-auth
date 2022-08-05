import { NgModule } from '@angular/core';
// import { AppSortingModule } from './../app-sorting/app-sorting.module';
// import { AppProductModule } from './../app-product/app-product.module';
import { RouterModule } from '@angular/router';
// import { SharedModule } from '../app-shared/app-shared.module';
import { AllProductsComponent } from './components/app-all-products/all-products.component';
// import { AppViewCartModule } from '../app-view-cart/app-view-cart.module';
import { SortingComponent } from './components/app-sorting/sorting.component';
// import { ViewCartComponent } from '../view-cart/components/app-view-cart/view-cart.component';
import { NgMaterialModule } from '../common-modules/ng-material.module';
import { ProductComponent } from './components/app-product/product.component';
import { SharedModule } from '../shared/shared.module';
import { ViewCartModule } from '../view-cart/view-cart.module';

@NgModule({
    declarations: [
        AllProductsComponent,
        SortingComponent,
        // ViewCartComponent,
        ProductComponent,
    ],
    imports: [
        NgMaterialModule,
        SharedModule,
        ViewCartModule,
        // AppProductModule,
        // AppSortingModule,
        // AppViewCartModule,
        RouterModule.forChild([
            {path: '', component: AllProductsComponent}
        ])

    ],
  })
  export class AllProductsModule { }
