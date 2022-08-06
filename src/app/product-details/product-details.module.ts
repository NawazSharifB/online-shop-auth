import { CommonModule } from '@angular/common';
// import { AppSharedModule } from './../app-shared/app-shared.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
// import { AppAddToCartModule } from '../app-add-to-cart/app-add-to-cart.module';
// import { NgMaterialModule } from '../app-angular-material/app-angular-material.module';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
// import { AppViewCartModule } from '../app-view-cart/app-view-cart.module';
import { NgMaterialModule } from '../common-modules/ng-material.module';
import { ViewCartModule } from '../view-cart/view-cart.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        ProductDetailsComponent
    ],
    imports: [
        NgMaterialModule,
        // AppAddToCartModule,
        // AppViewCartModule,
        ViewCartModule,
        SharedModule,
        CommonModule,
        RouterModule.forChild([
            {path: ':id', component: ProductDetailsComponent}
        ])
    ],
  })
export class ProductDetailsModule { }
