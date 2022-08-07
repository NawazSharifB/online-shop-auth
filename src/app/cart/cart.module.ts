import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgMaterialModule } from '../common-modules/ng-material.module';
import { SharedModule } from '../shared/shared.module';
import { CartComponent } from './components/app-cart/cart.component';
import { CheckoutComponent } from './components/app-checkout/checkout.component';

@NgModule({
  declarations: [CartComponent, CheckoutComponent],
  imports: [
    NgMaterialModule,
    SharedModule,
    RouterModule.forChild([
      {path: '', component: CartComponent},
    ]),
  ],
})
export class CartModule {}
