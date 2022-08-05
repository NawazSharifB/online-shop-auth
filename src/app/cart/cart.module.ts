// import { AppSharedModule } from './../app-shared/app-shared.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { CartComponent } from './components/app-cart/cart.component';
// import { NgMaterialModule } from '../app-angular-material/app-angular-material.module';
// import { AppCheckoutModule } from '../app-checkout/app-checkout.module';
// import { AppAddToCartModule } from '../app-add-to-cart/app-add-to-cart.module';
import { CheckoutComponent } from './components/app-checkout/checkout.component';
import { SharedModule } from '../shared/shared.module';
import { NgMaterialModule } from '../common-modules/ng-material.module';

@NgModule({
    declarations: [CartComponent, CheckoutComponent],
    imports: [
        NgMaterialModule,
        // AppCheckoutModule,
        SharedModule,
        // AppAddToCartModule,
        RouterModule.forChild([
            {path: '', component: CartComponent}
        ])
    ],
    exports: [
        // CartComponent
    ]
  })
export class CartModule {}
